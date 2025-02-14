/* eslint-disable react/prop-types */
const MenuItemFilter = ({ setOption, activeOption }) => {
  return (
    <div className="pt-6">
      <div className="flex gap-3">
        {["All", "VEG", "NONVEG", "Ratings 4.0"].map((option) => (
          <button
            key={option}
            className={`w-20 h-10  rounded-3xl ${
              activeOption === option ? "bg-purple-800" : "bg-slate-700"
            }`}
            value={option}
            onClick={(e) => setOption(e.target.value)}
          >
            {option !== "Ratings 4.0" ? option : "bestSeller"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuItemFilter;
