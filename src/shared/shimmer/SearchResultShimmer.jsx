const SearchResultShimmer = () => {
  return (
    <div className="pt-8">
      <div className="flex gap-4">
        {Array(2)
          .fill("")
          .map((btn, index) => (
            <button
              key={index}
              className="w-24 h-8 bg-slate-800 animate-pulse rounded-2xl"
            ></button>
          ))}
      </div>
      <div className="flex gap-3 mt-6">
        {Array(8)
          .fill("")
          .map((btn, index) => (
            <button
              key={index}
              className="w-20 h-8 rounded-2xl bg-slate-800 animate-pulse"
            ></button>
          ))}
      </div>

      <div className="flex flex-wrap gap-6 mt-6">
        {Array(6)
          .fill("")
          .map((card, index) => (
            <div
              key={index}
              className="bg-slate-800 w-[438px] h-[275px] mb-2 animate-pulse"
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
