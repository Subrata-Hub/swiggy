import { useNavigate, useParams } from "react-router-dom";
import useTagsDetails from "../hooks/useTagsDetails";

import TagsDetails from "../components/TagsDetails";
import { useState } from "react";
import TagDetailShimmer from "../shared/shimmer/TagDetailShimmer";
import { useSelector } from "react-redux";
import { HiArrowLeft } from "react-icons/hi";
import { TAG_BANAR_IMG } from "../utils/constant";

const TagsCollectionPage = () => {
  const [loading, setLoading] = useState();
  const { collection_id, tags } = useParams();

  const navigate = useNavigate();

  const userLocationData = useSelector(
    (store) => store?.firebaseData?.userLocationData
  );

  const placeData = useSelector(
    (store) => store.firebaseData?.userLocationData
  );
  const placeArray = placeData?.address_components?.filter((cityList) =>
    cityList?.types?.find((item) => item === "city")
  );

  const city = placeArray?.[0]?.long_name;

  const LAT = userLocationData && userLocationData?.latlng?.LAT;
  const LNG = userLocationData && userLocationData?.latlng?.LNG;

  const tagsDetailData = useTagsDetails(
    collection_id,
    tags,
    setLoading,
    LAT,
    LNG
  );

  const preview = tagsDetailData?.[0]?.card?.card;
  const restaurantList = tagsDetailData?.slice(2);

  // pt-15 m-[140px] mt-0 mb-0

  const goToPreviousPage = () => {
    navigate(history.back());
  };

  return (
    <div
      className={`mt-0 sm:mt-32 mx-0 sm:mx-[40px] md:mx-[30px] lg:mx-[50px] xl:mx-[140px]`}
    >
      {loading && tagsDetailData.length === 0 ? (
        <TagDetailShimmer />
      ) : (
        <>
          <div className="flex w-full sm:hidden h-36">
            <img
              src={TAG_BANAR_IMG + preview?.imageId}
              className="w-full h-full object-fill"
            />
          </div>
          <div className="flex  sm:hidden fixed top-4 left-4">
            <HiArrowLeft className="text-xl" onClick={goToPreviousPage} />
          </div>
          <div className="mx-4 sm:mx-0">
            <h1 className="mt-4 sm:mt-15 text-2xl sm:text-4xl font-bold">
              {preview?.title}
            </h1>
            <h2 className="mt-2">{preview?.description}</h2>
            <h1 className="text-3xl mt-4 font-bold">
              {restaurantList?.length} to explore
            </h1>
          </div>

          <div className="mx-4 sm:mx-0">
            <TagsDetails restaurantList={restaurantList} city={city} />
          </div>
        </>
      )}
    </div>
  );
};

export default TagsCollectionPage;
