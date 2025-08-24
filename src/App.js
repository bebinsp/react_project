import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch (e) {
      return [];
    }
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchRecipes = async (term = searchTerm) => {
    if (!term) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          term
        )}`
      );
      const data = await res.json();
      setRecipes(data.meals || []);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.idMeal === recipe.idMeal);
      if (exists) return prev.filter((f) => f.idMeal !== recipe.idMeal);
      return [...prev, recipe];
    });
  };

  const handleViewDetails = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const goBackFromResults = () => {
    setShowResults(false);
    setSelectedRecipe(null);
  };

  const goBackFromDetails = () => {
    setSelectedRecipe(null);
  };

  // ✅ Pick background based on current view
  const getBackground = () => {
    if (selectedRecipe) return "/details-bg.jpg";
    if (showResults) return "/results-bg.jpg";
    return "/Home-bg.jpg";
  };

  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${getBackground()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <header>
        <h1>🍽 Recipe Finder</h1>
        <p className="subtitle">Search meals using TheMealDB</p>
      </header>

      <main>
        {/* Home/Search view */}
        {!showResults && !selectedRecipe && (
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={() => fetchRecipes(searchTerm)}
          />
        )}

        {/* Results view */}
        {showResults && !selectedRecipe && (
          <section>
            <button className="back-button" onClick={goBackFromResults}>
              ⬅ Back
            </button>
            {loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <RecipeList
                recipes={recipes}
                onFavorite={toggleFavorite}
                favorites={favorites}
                onViewDetails={handleViewDetails}
              />
            )}
          </section>
        )}

        {/* Details view */}
        {selectedRecipe && (
          <>
            <button className="back-button" onClick={goBackFromDetails}>
              ⬅ Back
            </button>
            <RecipeModal recipe={selectedRecipe} onClose={goBackFromDetails} />
          </>
        )}

        {/* Favorites */}
        <section className="favorites">
          <h2>❤️ Favorites</h2>
          {favorites.length === 0 ? (
            <p className="muted">
              No favorites yet — add some recipes you love!
            </p>
          ) : (
            <div className="fav-list">
              {favorites.map((r) => (
                <div
                  key={r.idMeal}
                  className="fav-item"
                  onClick={() => handleViewDetails(r)}
                >
                  <img src={r.strMealThumb} alt={r.strMeal} />
                  <div className="fav-meta">
                    <strong>{r.strMeal}</strong>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(r);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <small>Built with React • Data from TheMealDB</small>
      </footer>
    </div>
  );
}

export default App;
