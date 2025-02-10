import ImageInfoLayoutCard from "./ImageInfoLayoutCard";

/* eslint-disable react/prop-types */
const ImageInfoLayout = ({ resData }) => {
  console.log(resData);

  if (!resData) return;

  return (
    <>
      <h1 className="text-2xl font-bold">Subrata, what&apos;s on your mind?</h1>

      <div className="w-full  overflow-x-auto hide-scrollbar">
        <div className="flex">
          {resData?.[0]?.card?.card?.imageGridCards?.info?.map((resInfo) => (
            <ImageInfoLayoutCard resInfo={resInfo} key={resInfo.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageInfoLayout;
