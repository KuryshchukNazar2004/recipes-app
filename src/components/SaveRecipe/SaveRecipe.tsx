import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Recipe } from '../../types/index';
import './SaveRecipe.scss';

interface SaveRecipeProps {
  selectedRecipes: Recipe[];
  onRemove: (recipeId: string) => void; 
}

const SaveRecipe: React.FC<SaveRecipeProps> = ({ selectedRecipes, onRemove }) => {
  const navigate = useNavigate(); 

  const getTotalIngredients = () => {
    const ingredients = selectedRecipes.flatMap(recipe => 
      Array.from({ length: 20 }, (_, index) => ({
        ingredient: recipe[`strIngredient${index + 1}`],
        measure: recipe[`strMeasure${index + 1}`]
      }))
    ).filter(item => item.ingredient); 

    return ingredients;
  };

  const totalIngredients = getTotalIngredients();

  const getInstructions = () => {
    return selectedRecipes.map(recipe => recipe.strInstructions).join('\n');
  };

  return (
    <div className="cart-container">
      <header className="cart-header">
        <button className="back-button" onClick={() => navigate(-1)}>Назад</button>
        <h2 className="cart-title">Ваш кошик</h2>
      </header>

      {selectedRecipes.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        <>
          <div className="selected-recipes">
            {selectedRecipes.map(recipe => ( 
              <div key={recipe.idMeal} className="cart-item">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
                <div className="item-details">
                  <h3 className="recipe-title">{recipe.strMeal}</h3>
                  <button onClick={() => onRemove(recipe.idMeal)} className="remove-button">Видалити</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="total-ingredients">
            <h4>Сумарний список інгредієнтів:</h4>
            <ul className="total-ingredient-list">
              {totalIngredients.map((item, index) => (
                <li key={index} className="total-ingredient">
                  {item.ingredient} <span className="colon">:</span> {item.measure}
                </li>
              ))}
            </ul>
            <h4>Інструкції:</h4>
            <p>{getInstructions()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default SaveRecipe;
