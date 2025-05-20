import RestaurantCardShimmer from "./RestaurantCardShimmer";

const RestaurantsShimmer = () => {
  return (
    <div className="w-full">
      <div className="h-8 w-100 bg-slate-800 mt-6"></div>

      <div className="w-full  overflow-x-auto hide-scrollbar mt-6">
        <div className="flex gap-4">
          {Array(10)
            .fill("")
            .map((item, index) => (
              <div key={index} className="w-[144px] h-[188px] flex-shrink-0 ">
                <div className="w-[144px] h-[144px] rounded-full bg-slate-800 animate-pulse"></div>
              </div>
            ))}
        </div>
      </div>
      <div className="h-8 w-100 bg-slate-800 mt-4"></div>
      <div className="mt-6">
        <div className="flex flex-wrap gap-8">
          {Array(4)
            .fill("")
            .map((item, index) => (
              <RestaurantCardShimmer key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsShimmer;
