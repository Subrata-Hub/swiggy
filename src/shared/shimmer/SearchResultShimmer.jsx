const SearchResultShimmer = () => {
  // w-[438px] h-[275px]
  return (
    <div className="pt-3">
      <div className="flex gap-4">
        {Array(2)
          .fill("")
          .map((btn, index) => (
            <button
              key={index}
              className="w-28 h-9 bg-slate-800 animate-pulse rounded-2xl"
            ></button>
          ))}
      </div>
      <div className={`flex gap-3 mt-8`}>
        {Array(8)
          .fill("")
          .map((btn, index) => (
            <button
              key={index}
              className="w-24 h-9 rounded-2xl bg-slate-800 animate-pulse"
            ></button>
          ))}
      </div>

      <div className="flex flex-wrap bg-slate-900  h-auto gap-6 mt-6 xs:px-2 sm:px-2 md:px-4 lg:px-4 py-4">
        {Array(6)
          .fill("")
          .map((card, index) => (
            <div
              key={index}
              className="bg-slate-800 w-[380px] xs:w-[380px] sm:w-[280px] md:w-[320px] lg:w-[430px] xl:w-[438px] h-[275px] mb-2 animate-pulse"
            >
              <div className="flex-col">
                {/* Header Section */}
                <div className="flex justify-between items-center px-4 py-3">
                  <div className="flex-col space-y-2">
                    <div className="h-4 w-28 bg-slate-700 rounded"></div>
                    <div className="h-3 w-36 bg-slate-700 rounded"></div>
                  </div>

                  <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
                </div>

                <div className="w-full h-0.5 bg-slate-700 mt-3"></div>

                {/* Content Section */}
                <div className="flex justify-between items-center py-4 px-3">
                  <div className="flex-col w-1/2 space-y-3">
                    <div className="h-4 w-10 bg-slate-700 rounded"></div>
                    <div className="h-5 w-36 bg-slate-700 rounded"></div>
                    <div className="h-4 w-16 bg-slate-700 rounded"></div>
                    <div className="h-8 w-24 bg-slate-700 rounded mt-2"></div>
                  </div>

                  <div className="w-[156px] h-[144px] bg-slate-700 rounded-2xl"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchResultShimmer;
