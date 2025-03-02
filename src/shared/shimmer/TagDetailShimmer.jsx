import RestaurantCardShimmer from "./RestaurantCardShimmer";

const TagDetailShimmer = () => {
  return (
    <div>
      <div className="h-10 w-40 bg-slate-800 mt-10"></div>
      <div className="mt-2 h-6 w-100 bg-slate-800"></div>
      <div className="mt-6 h-8 w-80 bg-slate-800"></div>

      <div className="flex flex-wrap mt-10 gap-8">
        {Array(8)
          .fill("")
          .map((item, index) => (
            <RestaurantCardShimmer key={index} />
          ))}
      </div>
    </div>
  );
};

export default TagDetailShimmer;
