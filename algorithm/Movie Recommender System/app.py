from flask import Flask, request, jsonify
import pickle
import requests

app = Flask(__name__)

def fetch_poster(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=b920124b119c33ce96596988f22abbcf"
    data = requests.get(url).json()
    poster_path = data['poster_path']
    full_path = "http://image.tmdb.org/t/p/w500/" + poster_path
    return full_path

def recommend(movie):
    index = movies[movies['title'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_movies_name = []
    recommended_movies_poster = []
    for i in distances[1:6]:
        movie_id = movies.iloc[i[0]].movie_id
        recommended_movies_poster.append(fetch_poster(movie_id))
        recommended_movies_name.append(movies.iloc[i[0]].title)
    return recommended_movies_name, recommended_movies_poster

# Load the movies and similarity data
movies = pickle.load(open('artificats/movie_list.pkl', 'rb'))
similarity = pickle.load(open('artificats/similarity.pkl', 'rb'))

@app.route('/recommend', methods=['GET'])
def recommend_movies():
    movie = request.args.get('movie')
    if movie:
        recommended_movies_name, recommended_movies_poster = recommend(movie)
        return jsonify({
            'recommended_movies_name': recommended_movies_name,
            'recommended_movies_poster': recommended_movies_poster
        })
    return jsonify({'error': 'No movie title provided'})

if __name__ == '__main__':
    app.run(debug=True)
