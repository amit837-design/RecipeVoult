import React from "react";
import { Plus } from "lucide-react";

const CustomHeader = ({ onAddClick }) => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50
                 bg-transparent border-b-[0.5px] border-white/10
                 flex items-center justify-between
                 px-6 py-2 backdrop-blur-lg backdrop-saturate-150"
    >
      <h1 className="text-2xl font-bold text-white">RecipeHub</h1>
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded cursor-pointer transition-colors duration-300 font-semibold"
      >
        <Plus size={18} /> Add Recipe
      </button>
    </header>
  );
};

export default CustomHeader;
