import { useParams } from "react-router-dom";
import useTagsDetails from "../hooks/useTagsDetails";

import TagsDetails from "../components/TagsDetails";
import { useState } from "react";
import TagDetailShimmer from "../shared/shimmer/TagDetailShimmer";
import { useSelector } from "react-redux";

const TagsCollectionPage = () => {
  const [loading, setLoading] = useState();
  const { collection_id, tags } = useParams();

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

  return (
    <div className="pt-15 m-[140px] mt-0 mb-0">
      {loading && tagsDetailData.length === 0 ? (
        <TagDetailShimmer />
      ) : (
        <>
          <h1 className="mt-15 text-4xl font-bold">{preview?.title}</h1>
          <h2 className="mt-2">{preview?.description}</h2>
          <h1 className="text-3xl mt-4 font-bold">
            {preview?.count} to explore
          </h1>

          <TagsDetails restaurantList={restaurantList} city={city} />
        </>
      )}
    </div>
  );
};

export default TagsCollectionPage;
