import React from 'react';

export default function RecipeCard({ recipe, onFavorite, isFavorite, onViewDetails }) {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <div className="card-body">
        <h3>{recipe.strMeal}</h3>
        <p className="meta">{recipe.strCategory} • {recipe.strArea}</p>
        <div className="card-actions">
          <button onClick={() => onViewDetails(recipe)}>Details</button>
          <button onClick={() => onFavorite(recipe)}>{isFavorite ? '💔 Remove' : '❤️ Favorite'}</button>
        </div>
      </div>
    </div>
  );
}
