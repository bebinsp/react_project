import React from 'react';

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ing && ing.trim() !== '') {
      ingredients.push(`${ing}${measure ? ' — ' + measure : ''}`);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{recipe.strMeal}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <img className="modal-img" src={recipe.strMealThumb} alt={recipe.strMeal} />

        <div className="modal-section">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>Instructions</h3>
          <p>{recipe.strInstructions}</p>
        </div>

        {recipe.strSource && (
          <p className="muted">Source: <a href={recipe.strSource} target="_blank" rel="noreferrer">{recipe.strSource}</a></p>
        )}
      </div>
    </div>
  );
}
