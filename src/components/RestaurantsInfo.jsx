/* eslint-disable react/prop-types */
const RestaurantsInfo = ({ resDetailsData }) => {
  const resInfoData = resDetailsData?.[2]?.card?.card?.info;

  // border-r-[20px] border-l-[20px] border-b-[20px]

  return (
    <div className="w-full">
      <h1 className="text-2xl  font-bold">{resInfoData?.name}</h1>
      <div className="w-full h-[180px] bg-gray-700 mt-6 rounded-b-2xl rounded-t-xl z-0">
        <div className="mx-5 p-4  bg-gray-800  mb-5 border-2 border-slate-600 rounded-2xl shadow-2xl">
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
