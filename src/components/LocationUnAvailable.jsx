import { UNSERVICEABLE_IMG } from "../utils/constant";

/* eslint-disable react/prop-types */
const LocationUnAvailable = ({ swiggyNotPresent }) => {
  return (
    <div className="flex justify-center items-center mt-20">
      <div className="flex flex-col  w-[300px] justify-center">
        <div className="h-[300px] w-[300px]">
          <img
            src={UNSERVICEABLE_IMG}
            className="h-[300px] w-[300px] object-center"
            loading="lazy"
          />
        </div>
        <div>
          <h1 className="text-center font-bold text-2xl">
            {swiggyNotPresent?.[0]?.card?.card?.title}
          </h1>
          <p className="text-center mt-4">
            We don’t have any services here till now. Try changing location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationUnAvailable;
