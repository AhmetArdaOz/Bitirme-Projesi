from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import pickle
import requests
import logging
import os

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "*"}})

logging.basicConfig(level=logging.DEBUG)

def fetch_poster(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=b920124b119c33ce96596988f22abbcf"
    data = requests.get(url).json()
    poster_path = data.get('poster_path', '')
    full_path = f"http://image.tmdb.org/t/p/w500/{poster_path}" if poster_path else ''
    return full_path

def recommend(movie):
    try:
        logging.debug(f"Searching for movie: {movie}")
        if movie not in movies['title'].values:
            raise ValueError(f"Movie '{movie}' not found in database.")
        index = movies[movies['title'] == movie].index[0]
        distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
        recommended_movies_name = []
        recommended_movies_poster = []
        for i in distances[1:6]:
            movie_id = movies.iloc[i[0]].movie_id
            recommended_movies_poster.append(fetch_poster(movie_id))
            recommended_movies_name.append(movies.iloc[i[0]].title)
        return recommended_movies_name, recommended_movies_poster
    except Exception as e:
        logging.error(f"Error in recommend function: {str(e)}")
        raise


current_directory = os.getcwd()
logging.debug(f"Current working directory: {current_directory}")

movie_list_path = 'artificats/movie_list.pkl'
similarity_path = 'artificats/similarity.pkl'

logging.debug(f"Checking existence of {movie_list_path}: {os.path.exists(movie_list_path)}")
logging.debug(f"Checking existence of {similarity_path}: {os.path.exists(similarity_path)}")

try:
    movies = pickle.load(open(movie_list_path, 'rb'))
    similarity = pickle.load(open(similarity_path, 'rb'))
except Exception as e:
    logging.error(f"Error loading data: {str(e)}")
    raise

@app.route('/recommend', methods=['GET'])
def recommend_movies():
    try:
        movie = request.args.get('movie')
        movie = requests.utils.unquote(movie)  
        logging.debug(f"Received movie title: {movie}")
        if movie:
            recommended_movies_name, recommended_movies_poster = recommend(movie)
            response = make_response(jsonify({
                'recommended_movies_name': recommended_movies_name,
                'recommended_movies_poster': recommended_movies_poster
            }))
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
        response = make_response(jsonify({'error': 'No movie title provided'}), 400)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except ValueError as e:
        logging.error(f"ValueError in /recommend endpoint: {str(e)}")
        response = make_response(jsonify({'error': str(e)}), 404)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    except Exception as e:
        logging.error(f"Error in /recommend endpoint: {str(e)}")
        response = make_response(jsonify({'error': 'An error occurred on the server'}), 500)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

if __name__ == '__main__':
    app.run(debug=True)
