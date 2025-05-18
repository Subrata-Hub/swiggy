import { Link } from "react-router-dom";
import { IMG_URL } from "../utils/constant";

/* eslint-disable react/prop-types */
const ImageInfoLayoutCard = ({ resInfo }) => {
  const link = resInfo?.action?.link;
  const match = link.match(/collection_id=(\d+)/);
  const collectionId = match ? match[1] : null;

  return (
    <div className="w-[100px] sm:w-[144px] h-[124px] sm:h-[188px] flex-shrink-0">
      <Link
        to={`/collection/${collectionId}/layout_CCS_${resInfo?.action.text}/${resInfo?.action?.text}`}
      >
        <img
          src={IMG_URL + resInfo.imageId}
          // className="w-[144px] h-[180px] object-contain"
          className="w-[100px] sm:w-[144px] h-[124px] sm:h-[188px]  object-cover"
        />
      </Link>
    </div>
  );
};

export default ImageInfoLayoutCard;
