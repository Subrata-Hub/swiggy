import { IMG_URL } from "../utils/constant";

/* eslint-disable react/prop-types */
const ImageInfoLayoutCard = ({ resInfo }) => {
  return (
    <div className="w-[144px] h-[188px] flex-shrink-0">
      <img
        src={IMG_URL + resInfo.imageId}
        className="w-[144px] h-[180px] object-contain"
      />
    </div>
  );
};

export default ImageInfoLayoutCard;
