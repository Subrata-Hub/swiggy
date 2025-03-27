/* eslint-disable react/prop-types */
const RestaurantsInfo = ({ resDetailsData }) => {
  const resInfoData = resDetailsData?.[2]?.card?.card?.info;

  return (
    <div className="px-48">
      <h1 className="text-2xl mt-10 font-bold">{resInfoData?.name}</h1>
      <div className="w-full h-40 bg-gray-800 mt-6">
        <div className="p-4">
          <div className="text-[17px] font-semibold">
            ❇️ {resInfoData?.avgRatingString}({resInfoData?.totalRatingsString}){" "}
            {" .  "}
            {resInfoData?.costForTwoMessage}
          </div>
          <p className="text-[16px] ml-1">{resInfoData?.cuisines.join(", ")}</p>
          <div className="flex gap-4  mt-3">
            <div className="flex-col mt-2">
              <div className="w-[7px] h-[7px] rounded-full bg-gray-600"></div>
              <div className="w-[2px] h-[40px] bg-gray-600 ml-[2px]"></div>
              <div className="w-[7px] h-[7px] rounded-full bg-gray-600"></div>
            </div>

            <div className="font-semibold ">
              <p>
                Outlet{" "}
                <span className="font-light ml-2">{resInfoData?.areaName}</span>
              </p>
              <p className="mt-4">{resInfoData?.sla?.slaString}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsInfo;
