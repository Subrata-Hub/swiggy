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

  return (
    <div className="">
      <h1 className="text-2xl font-bold">
        {userData !== undefined && userData?.name}
        {", "}
        {topRestaurantsHeader}
      </h1>

      <div className="w-full  overflow-x-auto hide-scrollbar">
        <div className="flex">
          {topRestaurants?.map((resInfo) => (
            <ImageInfoLayoutCard resInfo={resInfo} key={resInfo.id} />
          ))}
        </div>
        {topRestaurants && (
          <div className="w-full h-[1px] bg-slate-700 mt-10"></div>
        )}
      </div>
    </div>
  );
};

export default ImageInfoLayout;
