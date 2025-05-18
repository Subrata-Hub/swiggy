import ImageInfoLayoutCard from "./ImageInfoLayoutCard";
// import TopRestaurants from "./TopRestaurants";

/* eslint-disable react/prop-types */
const ImageInfoLayout = ({ resData, userData }) => {
  if (!resData) return;
  const resDataForImageInfoLayoutHeader = resData?.filter(
    (item) => item?.card?.card?.id === "whats_on_your_mind"
  );

  const resDataForImageInfoLayout = resData?.filter(
    (item) => item?.card?.card?.id === "whats_on_your_mind"
  );
  const topRestaurantsHeader =
    resDataForImageInfoLayoutHeader?.[0]?.card?.card?.header?.title;
  const topRestaurants =
    resDataForImageInfoLayout?.[0]?.card?.card?.imageGridCards?.info;

  // Split into two arrays
  const midIndex = Math.ceil(topRestaurants?.length / 2);
  const firstRow = topRestaurants?.slice(0, midIndex);
  const secondRow = topRestaurants?.slice(midIndex);

  return (
    <div className="mx-1 sm:mx-2">
      <h1 className="text-xl sm:text-2xl font-bold">
        {userData !== undefined && userData?.name}
        {userData !== undefined && userData?.name ? ", " : ""}
        {topRestaurantsHeader}
      </h1>

      {/* Row 1 */}
      <div className="w-full overflow-x-auto overflow-y-hidden hide-scrollbar">
        <div className="hidden sm:flex">
          {topRestaurants?.map((resInfo) => (
            <ImageInfoLayoutCard resInfo={resInfo} key={resInfo.id} />
          ))}
        </div>
        <div className="flex sm:hidden mb-1">
          {firstRow?.map((resInfo) => (
            <ImageInfoLayoutCard resInfo={resInfo} key={resInfo.id} />
          ))}
        </div>
        <div className="flex sm:hidden -mt-5">
          {secondRow?.map((resInfo) => (
            <ImageInfoLayoutCard resInfo={resInfo} key={resInfo.id} />
          ))}
        </div>
        {topRestaurants && (
          <div className="w-full h-[1px] bg-slate-700 mt-6 sm:mt-10"></div>
        )}
      </div>
    </div>
  );
};

export default ImageInfoLayout;
