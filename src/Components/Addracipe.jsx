import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const Addracipe = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Recipe name is required";
    if (!description.trim()) errs.description = "Description is required";
    if (!imageUrl.trim()) {
      errs.imageUrl = "Image URL is required";
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|bmp|svg|png|avif)/i.test(imageUrl)) {
      errs.imageUrl = "Enter a valid image URL";
    }
    if (ingredients.length === 0) errs.ingredients = "At least one ingredient is required";
    return errs;
  };

  const submit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSave({
      id: crypto.randomUUID(),
      favourite: false,
      name: name.trim(),
      description: description.trim(),
      imageUrl,
      ingredients: ingredients.filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded border border-white/10 bg-white/10 backdrop-blur-2xl backdrop-saturate-200 shadow-xl p-6 space-y-5 text-white">
        {/* header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-semibold">Add New Recipe</h2>
          <button onClick={onClose} className="text-white hover:text-red-400 transition duration-200 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* form */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-zinc-300">Recipe Name</span>
            <input
              type="text"
              placeholder="e.g. Spaghetti Carbonara"
              className={`mt-1 w-full rounded-lg bg-black/30 text-white p-2 placeholder:text-zinc-500 focus:outline-none focus:ring-2 ${
                errors.name ? "focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </label>

          <label className="block">
            <span className="text-sm text-zinc-300">Description</span>
            <textarea
              rows="3"
              placeholder="A short description of the dish..."
              className={`mt-1 w-full rounded-lg bg-black/30 text-white p-2 resize-none placeholder:text-zinc-500 focus:outline-none focus:ring-2 ${
                errors.description ? "focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
          </label>

          <label className="block">
            <span className="text-sm text-zinc-300">Image URL</span>
            <input
              type="url"
              placeholder="https://placehold.co/600x400.png"
              className={`mt-1 w-full rounded-lg bg-black/30 text-white p-2 placeholder:text-zinc-500 focus:outline-none focus:ring-2 ${
                errors.imageUrl ? "focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            {errors.imageUrl && <p className="text-red-400 text-xs mt-1">{errors.imageUrl}</p>}
          </label>

          {/* ingredients */}
          <label className="block">
            <span className="text-sm text-zinc-300">Ingredients</span>
            <input
              type="text"
              placeholder="e.g. Tomatoes, Basil, Garlic"
              className={`mt-1 w-full rounded-lg bg-black/30 text-white p-2 placeholder:text-zinc-500 focus:outline-none focus:ring-2 ${
                errors.ingredients ? "focus:ring-red-500" : "focus:ring-orange-500"
              }`}
              value={ingredients.join(", ")}
              onChange={(e) =>
                setIngredients(
                  e.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
            />
            {errors.ingredients && <p className="text-red-400 text-xs mt-1">{errors.ingredients}</p>}
          </label>
        </div>

        {/* footer */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-white/20 text-zinc-300 hover:text-white hover:border-white transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-4 py-2 rounded-lg bg-orange-700 hover:bg-orange-800 transition-colors duration-300 text-white font-semibold cursor-pointer"
          >
            Add Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addracipe;
