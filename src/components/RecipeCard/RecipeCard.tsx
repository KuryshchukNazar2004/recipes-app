import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Recipe } from '../../types/index';
import './RecipeCard.scss';

interface RecipeCardProps {
  recipe: Recipe;
  onAddToCart: (recipe: Recipe) => void; 
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onAddToCart }) => {
  const navigate = useNavigate(); 

  const handleSelect = () => {
    navigate(`/recipe/${recipe.idMeal}`); 
  };

  return (
    <div className="recipe-card">
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        className="recipe-image"
        onClick={handleSelect} 
      />
      <h3 className="recipe-title">{recipe.strMeal}</h3>
      <p className="recipe-category">Категорія: {recipe.strCategory}</p>
      <p className="recipe-area">Походження: {recipe.strArea}</p>
      <button className="select-button" onClick={handleSelect}>Вибрати</button>
      <button className="add-to-cart-button" onClick={() => onAddToCart(recipe)}>Додати в кошик</button> 
    </div>
  );
};

export default RecipeCard;
