import axios from 'axios';

const API_KEY = 'fbd275a080fd3aac51146bb6a6946f33';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchSearchResults = async (type, query) => {
  try {
    const response = await tmdbApi.get(`/search/${type}`, {
      params: { 
        query,
        include_adult: false,
        language: 'es-ES'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

