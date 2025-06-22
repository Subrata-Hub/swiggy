import RestaurantCardShimmer from "./RestaurantCardShimmer";

const TagDetailShimmer = () => {
  return (
    <div className="mt-2 sm:mt-32 mx-2">
      <div className="flex sm:hidden h-36 w-100 bg-slate-800"></div>
      <div className="h-10 w-40 bg-slate-800 mt-10"></div>
      <div className="mt-2 h-6 w-100 bg-slate-800"></div>
      <div className="mt-6 h-8 w-80 bg-slate-800"></div>

      <div className="flex flex-wrap mt-10 gap-4 sm:gap-2.5 md:gap-6 lg:gap-6 xl:gap-6 2xl:gap-7">
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
