import React, { useState, useEffect } from 'react';
import { Recipe } from '../../types/index';
import RecipeCard from '../RecipeCard/RecipeCard';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import './styles/RecipeList.scss';
import useRecipes from '../../hooks/useRecipes';

interface RecipeListProps {
  recipes: Recipe[];
  onAddToCart: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onAddToCart }) => {
  const { searchForRecipes } = useRecipes();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const categories = Array.from(new Set(recipes.map(recipe => recipe.strCategory)));

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory ? recipe.strCategory === selectedCategory : true;
    const matchesSearch = recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); 
  }, [searchTerm, selectedCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); 
  };

  const handleSearch = async (term: string) => {
    await searchForRecipes(term);
    setSearchTerm(term);
  };

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleSelectCategory} 
      />
      <div className="recipe-list">
        {currentRecipes.map(recipe => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} onAddToCart={onAddToCart} />
        ))}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default RecipeList;
