import ImageInfoLayoutCard from "./ImageInfoLayoutCard";

/* eslint-disable react/prop-types */
const ImageInfoLayout = ({ resData }) => {
  if (!resData) return;

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Subrata, what&apos;s on your mind?</h1>

      <div className="w-full  overflow-x-auto hide-scrollbar">
        <div className="flex">
          {resData?.[0]?.card?.card?.imageGridCards?.info?.map((resInfo) => (
            <ImageInfoLayoutCard resInfo={resInfo} key={resInfo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageInfoLayout;
