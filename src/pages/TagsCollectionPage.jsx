import { useParams } from "react-router-dom";
import useTagsDetails from "../hooks/useTagsDetails";
import Navbar from "../components/Navbar";

import TagsDetails from "../components/TagsDetails";
import { useState } from "react";
import TagDetailShimmer from "../shared/shimmer/TagDetailShimmer";

const TagsCollectionPage = () => {
  const [loading, setLoading] = useState();
  const { collection_id, tags } = useParams();
  const tagsDetailData = useTagsDetails(collection_id, tags, setLoading);

  const preview = tagsDetailData?.[0]?.card?.card;
  const restaurantList = tagsDetailData?.slice(2);

  return (
    <div className="m-36 mt-0 mb-0">
      <Navbar />
      {loading && tagsDetailData.length === 0 ? (
        <TagDetailShimmer />
      ) : (
        <>
          <h1 className="mt-15 text-4xl font-bold">{preview?.title}</h1>
          <h2 className="mt-2">{preview?.description}</h2>
          <h1 className="text-3xl mt-4 font-bold">
            {preview?.count} to explore
          </h1>

          <TagsDetails restaurantList={restaurantList} />
        </>
      )}
    </div>
  );
};

export default TagsCollectionPage;
