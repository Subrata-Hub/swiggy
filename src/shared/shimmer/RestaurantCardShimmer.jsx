const RestaurantCardShimmer = () => {
  // w-[283px] h-[182px] bg-slate-800 rounded-xl relative
  return (
    <div className="mb-4 relative animate-pulse">
      <div className="w-[175px] sm:w-[180px] md:w-[180px] lg:w-[220px] xl:w-[227px] 2xl:w-[284px] h-[170px] sm:h-[182px] bg-slate-800 rounded-xl relative">
        <div className="absolute w-full text-left px-[12px] pb-2 h-[81px] bg-gradient-to-t from-[rgb(27,30,36)] to-[rgba(27,30,36,0)] bottom-0"></div>
      </div>

      <div className="mt-3 ml-2 h-6 bg-slate-800 rounded max-w-[275px]"></div>

      <div className="ml-2 flex items-center space-x-2 mt-2">
        <div className="w-12 h-5 bg-slate-800 rounded"></div>
        <div className="w-20 h-5 bg-slate-800 rounded"></div>
      </div>

      <div className="ml-2 mt-1 h-5 bg-slate-800 rounded max-w-[275px]"></div>

      <div className="ml-2 mt-1 h-5 bg-slate-800 rounded max-w-[275px]"></div>
    </div>
  );
};

export default RestaurantCardShimmer;
