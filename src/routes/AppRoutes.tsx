import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import RecipeList from '../components/RecipeList/RecipeList';
import Cart from '../components/SaveRecipe/SaveRecipe';
import RecipeDetail from '../components/RecipeDetail/RecipeDetail';
import Header from '../components/Header/Header';
import useRecipes from '../hooks/useRecipes';

const RecipeDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRecipeById, selectedRecipe } = useRecipes();

  useEffect(() => {
    if (id) {
      getRecipeById(id);
    }
  }, [id, getRecipeById]);

  if (!selectedRecipe) {
    return <p>Завантаження рецепту...</p>;
  }

  return <RecipeDetail recipe={selectedRecipe} />;
};

const AppRoutes: React.FC = () => {
  const { recipes, selectedRecipes, addToCart, removeFromCart } = useRecipes();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <RecipeList recipes={recipes} onAddToCart={addToCart} />
            </>
          }
        />
        <Route
          path="/recipe/:id"
          element={<RecipeDetailWrapper />}
        />
        <Route
          path="/cart"
          element={<Cart selectedRecipes={selectedRecipes} onRemove={removeFromCart} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
