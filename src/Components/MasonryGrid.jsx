import React from "react";

/**
 * Masonry layout via CSS multi‑columns.
 * ‣ `columns-*` determines column count per breakpoint.
 * ‣ Each child wrapper gets vertical spacing + `break-inside-avoid`.
 */
const MasonryGrid = ({ children }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-6">
      {React.Children.map(children, (child, i) => (
        <div key={i} className="mb-6 break-inside-avoid">
          {child}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
