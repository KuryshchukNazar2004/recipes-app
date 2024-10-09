import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}search.php?s=`);
    return response.data.meals;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const fetchRecipeById = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}lookup.php?i=${id}`);
    return response.data.meals[0];
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
};

export const searchRecipes = async (term: string) => {
  try {
    const response = await axios.get(`${BASE_URL}search.php?s=${term}`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};
