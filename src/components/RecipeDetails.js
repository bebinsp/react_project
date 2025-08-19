// src/components/RecipeDetails.js
import React from "react";
import "../App.css";

function RecipeDetails({ recipe }) {
  if (!recipe) return null;

  return (
    <div className="recipe-details">
      <h2>{recipe.strMeal}</h2>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="modal-img"
      />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Area:</strong> {recipe.strArea}</p>
      <p><strong>Instructions:</strong></p>
      <p>{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetails;
