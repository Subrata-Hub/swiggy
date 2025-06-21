/* eslint-disable react/prop-types */

import { HiOutlineClock } from "react-icons/hi2";
import useUserFromDB from "../hooks/useUserFromDB";

const RecentLocationSearchCart = ({ getLocationId }) => {
  const userData = useUserFromDB();

  const userDataWithDescription =
    userData?.locations !== undefined &&
    userData?.locations?.filter((item) => item?.description);
  return (
    <div className="">
      {userDataWithDescription && userDataWithDescription?.length > 0 && (
        <>
          <div className="border mt-6 w-full sm:w-96 mb-10">
            <h4 className="pl-12 mt-2 text-[13px]">RECENT SEARCHES</h4>
            {userDataWithDescription &&
              userDataWithDescription?.map((item, index) => (
                <div key={index} className="flex flex-col gap-4">
                  <div
                    className="flex gap-4 mt-4 pl-4 cursor-pointer"
                    onClick={() =>
                      getLocationId(item?.description, item?.place_id)
                    }
                  >
                    {/* <HiMapPin className="text-xl mt-0.5" /> */}
                    <HiOutlineClock className="text-xl mt-1" />
                    <div className="">
                      <div className="font-[500] text-[16px]">
                        {/* {item?.structured_formatting?.main_text} */}
                        {item?.description?.split(",")[0]}
                      </div>
                      <div className="font-light text-[14px]">
                        {item?.description}
                      </div>
                    </div>
                  </div>
                  <div className="w-96 h-[1px] bg-slate-600 mt-2"></div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentLocationSearchCart;
