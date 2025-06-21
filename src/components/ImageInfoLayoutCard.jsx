import { useNavigate } from "react-router-dom";
import { IMG_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addShowNavigation } from "../utils/configSlice";

/* eslint-disable react/prop-types */
const ImageInfoLayoutCard = ({ resInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const link = resInfo?.action?.link;
  const match = link.match(/collection_id=(\d+)/);
  const collectionId = match ? match[1] : null;

  const goToTagDetailsPage = () => {
    navigate(
      `/collection/${collectionId}/layout_CCS_${resInfo?.action.text}/${resInfo?.action?.text}`
    );
    if (window.innerWidth < 640) {
      dispatch(addShowNavigation(false));
    }
  };

  return (
    <div
      className="w-[100px] sm:w-[144px] h-[124px] sm:h-[188px] flex-shrink-0 slide"
      onClick={goToTagDetailsPage}
    >
      <img
        src={IMG_URL + resInfo.imageId}
        // className="w-[144px] h-[180px] object-contain"
        className="w-[100px] sm:w-[144px] h-[124px] sm:h-[188px]  object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default ImageInfoLayoutCard;
