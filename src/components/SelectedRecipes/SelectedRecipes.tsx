import React from 'react';
import './styles/SelectedRecipes.scss';

interface SelectedRecipesProps {
  selectedRecipes: any[];
}

const SelectedRecipes: React.FC<SelectedRecipesProps> = ({ selectedRecipes }) => {
  return (
    <div className="selected-recipes">
      {selectedRecipes.length > 0 ? (
        <ul>
          {selectedRecipes.map((recipe) => (
            <li key={recipe.idMeal}>{recipe.strMeal}</li>
          ))}
        </ul>
      ) : (
        <p>No selected recipes.</p>
      )}
    </div>
  );
};

export default SelectedRecipes;
