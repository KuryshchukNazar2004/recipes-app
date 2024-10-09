import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../../types';
import './RecipeDetail.scss';

interface RecipeDetailProps {
  recipe: Recipe | null; 
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const navigate = useNavigate();

  if (!recipe) {
    return <p>Рецепт не знайдено</p>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="recipe-detail-container">
      <header className="recipe-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>Назад</button>
        <h1 className="recipe-title">{recipe.strMeal}</h1>
      </header>
      
      <div className="recipe-detail-content">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
        
        <h2>Категорія:</h2>
        <p className="recipe-category">{recipe.strCategory}</p>

        <h2>Область:</h2>
        <p className="recipe-area">{recipe.strArea}</p>

        <h2>Інгредієнти:</h2>
        <ul className="ingredient-list">
          {ingredients.length > 0 ? (
            ingredients.map((item, index) => (
              <li key={index}>
                <span className="ingredient">{item.ingredient}</span>
                <span className="colon">:</span>
                <span className="measure">{item.measure}</span>
              </li>
            ))
          ) : (
            <li>Інгредієнти не знайдено</li>
          )}
        </ul>

        <h2>Інструкції:</h2>
        <p className="instructions">{recipe.strInstructions}</p>

        {recipe.strYoutube && (
          <div className="video-container">
            <h2>Відео:</h2>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <h2>Джерело:</h2>
        {recipe.strSource && (
          <p className="recipe-source">
            <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
              {recipe.strSource}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
