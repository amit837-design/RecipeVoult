import React, { useState } from "react";
import CustomHeader from "./CustomHeader";
import Addracipe from "./Addracipe";
import MasonryGrid from "./MasonryGrid";
import { Heart, Trash2 } from "lucide-react";
import clsx from "clsx";

// starter data
const initialRecipes = [
  {
    id: crypto.randomUUID(),
    name: "Paneer Butter Masala",
    description:
      "A rich and creamy North Indian curry made with paneer (Indian cottage cheese) simmered in a buttery tomato-based sauce.",
    imageUrl:
      "https://i0.wp.com/infusedliving.net/wp-content/uploads/2023/03/Paneer-makhani-scaled.webp?fit=750%2C1000&ssl=1",
    ingredients: [
      "Paneer",
      "Butter",
      "Tomatoes",
      "Onion",
      "Garlic",
      "Ginger",
      "Green Chili",
      "Cream",
      "Kasuri Methi",
      "Garam Masala",
      "Red Chili Powder",
      "Turmeric",
      "Coriander Powder",
      "Salt",
      "Sugar",
    ],
    favourite: false,
  },
  {
    id: crypto.randomUUID(),
    name: "Vegetable Fried Rice",
    description:
      "A quick and flavorful Indo-Chinese dish made by stir-frying rice with mixed vegetables and soy sauce.",
    imageUrl:
      "https://veryveganish.com/wp-content/uploads/2024/06/Featured-Vegetable-Fried-Rice-no-egg-oil-free-1.jpg",
    ingredients: [
      "Cooked Rice",
      "Carrot",
      "Beans",
      "Capsicum",
      "Cabbage",
      "Onion",
      "Garlic",
      "Spring Onion",
      "Soy Sauce",
      "Vinegar",
      "Black Pepper",
      "Oil",
      "Salt",
    ],
    favourite: false,
  },
  {
  id: crypto.randomUUID(),
  name: "Chole Masala",
  description:
    "A spicy and tangy North Indian chickpea curry cooked with onions, tomatoes, and a blend of aromatic spices.",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhL86-b1sbgCXekww8REIduNiW9uxOrMc31A&s",
  ingredients: [
    "Chickpeas",
    "Onion",
    "Tomatoes",
    "Ginger",
    "Garlic",
    "Green Chili",
    "Cumin Seeds",
    "Bay Leaf",
    "Coriander Powder",
    "Turmeric",
    "Red Chili Powder",
    "Garam Masala",
    "Amchur (Dry Mango Powder)",
    "Salt",
    "Oil",
  ],
  favourite: false,
},

{
  id: crypto.randomUUID(),
  name: "Masala Dosa",
  description:
    "A crispy South Indian crepe made from fermented rice and urad dal batter, stuffed with a spicy potato filling.",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhoGsedDaTEJF97xIuGAoJzYh_Y2CyzPNUA&s",
  ingredients: [
    "Rice",
    "Urad Dal",
    "Potatoes",
    "Onion",
    "Mustard Seeds",
    "Turmeric",
    "Green Chili",
    "Curry Leaves",
    "Ginger",
    "Salt",
    "Oil",
  ],
  favourite: false,
},
{
  id: crypto.randomUUID(),
  name: "Vegetable Biryani",
  description:
    "A flavorful and aromatic rice dish layered with spiced vegetables, saffron, and fragrant basmati rice.",
  imageUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXdvi3T89fMkXJgZDZOFTbztT0jZwhXoHc9w&s",
  ingredients: [
    "Basmati Rice",
    "Carrots",
    "Beans",
    "Potatoes",
    "Cauliflower",
    "Green Peas",
    "Yogurt",
    "Onion",
    "Tomatoes",
    "Mint Leaves",
    "Coriander Leaves",
    "Ginger-Garlic Paste",
    "Biryani Masala",
    "Saffron",
    "Milk",
    "Oil",
    "Salt",
  ],
  favourite: false,
},

];

const MainBody = () => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("all");

  // helpers
  const addRecipe = (r) => setRecipes((prev) => [...prev, r]);
  const deleteRecipe = (id) =>
    setRecipes((prev) => prev.filter((x) => x.id !== id));
  const toggleFav = (id) =>
    setRecipes((prev) =>
      prev.map((x) => (x.id === id ? { ...x, favourite: !x.favourite } : x))
    );

  const visible =
    tab === "all" ? recipes : recipes.filter((r) => r.favourite === true);

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-8 pt-28 pb-6">
      {/* header */}
      {CustomHeader({ onAddClick: () => setShowModal(true) })}

      {/* tabs */}
      <div className="inline-flex rounded mb-6 bg-zinc-900 p-1 sticky top-15">
        {["all", "favourites"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              "px-4 py-2 text-sm rounded cursor-pointer transition-colors duration-200",
              tab === t
                ? "bg-black text-white font-semibold shadow"
                : "text-white font-semibold shadow"
            )}
          >
            {t === "all" ? "All Recipes" : "Favorites"}
          </button>
        ))}
      </div>

      {/* recipe masonry grid */}
      <MasonryGrid>
        {visible.map((r) => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onDelete={() => deleteRecipe(r.id)}
            onToggleFav={() => toggleFav(r.id)}
          />
        ))}
      </MasonryGrid>

      {showModal && (
        <addRecipe
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            addRecipe(data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default MainBody;

/* ------------ helper: RecipeCard inside body.jsx --------------- */
function RecipeCard({ recipe, onDelete, onToggleFav }) {
  const { name, description, imageUrl, ingredients, favourite } = recipe;
  return (
    <div className="w-full bg-black/90 rounded border-[0.5px] border-white/30 overflow-hidden flex flex-col">
      <img
        src={imageUrl}
        alt={name}
        className="h-48 w-full object-cover select-none pointer-events-none"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-1 capitalize">{name}</h3>
        <p className="text-sm text-zinc-400 line-clamp-3 mb-4">
          {description}
        </p>

        {/* chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ingredients.map((ing, i) => (
            <span
              key={i}
              className="bg-zinc-900 text-xs font-bold px-2 py-0.5 rounded-full capitalize"
            >
              {ing}
            </span>
          ))}
        </div>

        {/* actions */}
        <div className="mt-auto flex gap-3">
          <button onClick={onToggleFav} className="cursor-pointer">
            {favourite ? (
              <Heart size={20} className="fill-current text-red-500" />
            ) : (
              <Heart size={20} />
            )}
          </button>
          <button onClick={onDelete} className="cursor-pointer">
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
