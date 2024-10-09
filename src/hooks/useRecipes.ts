import { useEffect, useState } from 'react';
import { fetchRecipes, fetchRecipeById, searchRecipes } from '../api/api';
import { Recipe } from '../types/index';

const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      const allRecipes = await fetchRecipes();
      setRecipes(allRecipes);
    };
    getRecipes();
  }, []);

  const getRecipeById = async (id: string) => {
    const recipe = await fetchRecipeById(id);
    setSelectedRecipe(recipe);
  };

  const searchForRecipes = async (term: string) => {
    const searchResults = await searchRecipes(term);
    setRecipes(searchResults);
  };

  const addToCart = (recipe: Recipe) => {
    setSelectedRecipes(prev => [...prev, recipe]);
  };

const removeFromCart = (recipeId: string) => {
    setSelectedRecipes((prev) => prev.filter((recipe) => recipe.idMeal !== recipeId));
  };
  
  return {
    recipes,
    selectedRecipe,
    selectedRecipes,
    getRecipeById,
    searchForRecipes,
    addToCart,
    removeFromCart,
  };
};

export default useRecipes;
