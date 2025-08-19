import React from 'react';
import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes, onFavorite, favorites, onViewDetails }) {
  if (!recipes || recipes.length === 0) {
    return <p className="muted">No recipes found. Try searching for "chicken" or "pasta".</p>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onFavorite={onFavorite}
          isFavorite={favorites.some((f) => f.idMeal === recipe.idMeal)}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
