/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import useCupponCode from "../hooks/useCupponCode";
import { useState } from "react";
import { CUPPON_LOGO } from "../utils/constant";
import { HiMiniXMark } from "react-icons/hi2";

const PopupCupponCart = ({
  restaurantInfo,
  setShowPopupCupponCart,
  cart_value,
}) => {
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState({});
  const currentLocation = JSON.parse(localStorage.getItem("current_location"));

  const userLocationData = useSelector(
    (store) => store?.firebaseData?.userLocationData
  );

  const LAT =
    (userLocationData && userLocationData?.latlng?.LAT) ||
    currentLocation.latlng.LAT;
  const LNG =
    (userLocationData && userLocationData?.latlng?.LNG) ||
    currentLocation.latlng.LNG;

  const cupponData = useCupponCode(
    LAT,
    LNG,
    restaurantInfo?.restaurantId,
    cart_value,
    setLoading
  );

  const cardMessage = cupponData?.filter(
    (item) => item?.cardType === "messageCard"
  );

  const cupponCards = cupponData?.filter(
    (item) =>
      item?.cardType === "couponCardV2" ||
      item?.cardType === "unavailableCouponCardV2"
  );

  console.log(cupponCards);

  console.log(cupponData);

  const handleShowMore = (index) => {
    setShowMore((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <div className="fixed h-full top-20 sm:top-0 right-0 w-full px-2 sm:px-0 sm:w-[450px] md:w-[550px] lg:w-[630px] bg-slate-800 z-[2316136]">
        <div
          className="fixed top-24 pl-2 sm:pl-4 md:pl-10"
          onClick={() => setShowPopupCupponCart(false)}
        >
          <HiMiniXMark className="text-3xl" />
        </div>
        <div className="w-[400px] fixed top-40 pl-0 sm:pl-10">
          <input
            className="w-full h-12 border-2 border-slate-700 pl-4"
            placeholder="Enter your Cuppon"
          />

          <button className="fixed px-6 py-3 right-[10px] sm:right-[190px] bg-amber-600">
            APPLY
          </button>
        </div>

        <div className="w-[400px] h-full overflow-y-scroll hide-scrollbar mt-40 sm:mt-64 ml-0 sm:ml-10 border-2 border-slate-600">
          <div className="px-8 py-4 text-[13px]">
            {cardMessage?.[0]?.data?.data?.message}
          </div>

          {!loading && (
            <div className="mb-60">
              {cupponCards?.map((cuppon, index) => (
                <>
                  <div key={index} className="px-8 py-4">
                    <button className="flex gap-6 px-3 py-2  bg-orange-300 mb-4">
                      <img
                        src={CUPPON_LOGO + cuppon?.data?.data?.logo}
                        className="w-[20px] h-[20px]"
                        loading="lazy"
                      />
                      <p className="text-sm font-extrabold text-black">
                        {cuppon?.data?.data?.couponCode}
                      </p>
                    </button>
                    <h2 className="mb-4 font-semibold">
                      {cuppon?.data?.data?.title}
                    </h2>
                    <p className="mb-4 text-[12px]">
                      {cuppon?.data?.data?.description}
                    </p>

                    <button
                      className="text-blue-500 mb-4"
                      // onClick={() => handleShowMore(index)}
                      onClick={() => handleShowMore(index)}
                    >
                      +More
                    </button>

                    {showMore[index] && (
                      <>
                        <div>{cuppon?.data?.data?.tnc?.title}</div>

                        <div>
                          {cuppon?.data?.data?.tnc?.bulletTexts.map(
                            (item, index) => (
                              <li key={index}>{item}</li>
                            )
                          )}
                        </div>
                      </>
                    )}

                    {cuppon?.data?.data?.couponPreValidationStatus && (
                      <p className="text-[12px] text-orange-400">
                        {cuppon?.data?.data?.couponPreValidationStatus?.message}
                      </p>
                    )}
                    {cuppon?.data?.data?.isApplicable && (
                      <button className="px-4 py-2 mb-2 border-2 border-amber-500 flex flex-col">
                        APPLY CUPPON
                      </button>
                    )}
                  </div>
                  <div className="w-full h-0.5 bg-slate-700"></div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PopupCupponCart;
