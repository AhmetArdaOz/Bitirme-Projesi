import streamlit as st
import requests
import pickle

def fetch_recommendations(movie):
    url = f"http://127.0.0.1:5000/recommend?movie={movie}"
    response = requests.get(url)
    data = response.json()
    return data['recommended_movies_name'], data['recommended_movies_poster']

st.header("Movies Recommendation System")
movies = pickle.load(open('artificats/movie_list.pkl', 'rb'))

movie_list = movies['title'].values
selected_movie = st.selectbox(
    'Type or select a movie to get a recommendation',
    movie_list
)

if st.button('Show recommendation'):
    recommended_movies_name, recommended_movies_poster = fetch_recommendations(selected_movie)
    col1, col2, col3, col4, col5 = st.columns(5)
    with col1:
        st.text(recommended_movies_name[0])
        st.image(recommended_movies_poster[0])
    with col2:
        st.text(recommended_movies_name[1])
        st.image(recommended_movies_poster[1])
    with col3:
        st.text(recommended_movies_name[2])
        st.image(recommended_movies_poster[2])
    with col4:
        st.text(recommended_movies_name[3])
        st.image(recommended_movies_poster[3])
    with col5:
        st.text(recommended_movies_name[4])
        st.image(recommended_movies_poster[4])
