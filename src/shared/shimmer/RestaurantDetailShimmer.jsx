const RestaurantDetailShimmer = () => {
  return (
    <div className="mt-15 m-[140px]">
      <div className=" animate-pulse">
        {/* Title Skeleton */}
        <div className="h-8 w-40 bg-slate-700 rounded mt-10"></div>

        {/* Info Card Skeleton */}
        <div className="w-full h-40 bg-gray-800 mt-6 p-4">
          <div className="space-y-3">
            {/* Rating + Cost */}
            <div className="h-5 w-72 bg-gray-600 rounded"></div>
            {/* Cuisines */}
            <div className="h-4 w-96 bg-gray-600 rounded"></div>
            {/* Outlet & Time */}
            <div className="flex gap-4 mt-3">
              <div className="flex-col mt-2 items-center">
                <div className="w-[7px] h-[7px] rounded-full bg-gray-500"></div>
                <div className="w-[2px] h-[40px] bg-gray-500 ml-[2px]"></div>
                <div className="w-[7px] h-[7px] rounded-full bg-gray-500"></div>
              </div>
              <div className="space-y-4">
                <div className="h-5 w-40 bg-gray-600 rounded"></div>
                <div className="h-5 w-32 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-8 w-60 bg-gray-600 rounded mt-10"></div>
          <div className="overflow-x-auto hide-scrollbar w-full mt-4 ">
            <div className="flex gap-4">
              {Array(3)
                .fill("")
                .map((item, index) => (
                  <div key={index}>
                    <div className="w-86 h-24 bg-cyan-950 flex-shrink-0 rounded-2xl flex items-center p-4"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-15">
          <div className="mt-4 flex  items-center">
            <div className="flex justify-center items-center mt-2 w-full h-12 bg-slate-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailShimmer;
