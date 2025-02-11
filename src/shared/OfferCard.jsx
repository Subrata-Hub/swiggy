import { IMG_OFFER_LOGO } from "../utils/constant";

/* eslint-disable react/prop-types */
const OfferCard = ({ resDetailsData }) => {
  console.log(resDetailsData);
  return (
    <div className="mx-48 mt-4">
      <h className="text-xl">Deals for you</h>
      <div className="overflow-x-auto hide-scrollbar w-full mt-4 ">
        <div className="flex gap-4">
          {resDetailsData?.map((offcard, index) => (
            <div
              key={index}
              className="w-86 h-24 bg-cyan-950 flex-shrink-0 rounded-2xl flex items-center p-4"
            >
              <div className="flex gap-4">
                <div className="w-[48px] h-[48px]">
                  <img src={IMG_OFFER_LOGO + offcard?.info?.offerLogo} />
                </div>
                <div className="flex-col">
                  <h2>{offcard?.info?.header}</h2>
                  <p className="text-slate-300">{offcard?.info?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
