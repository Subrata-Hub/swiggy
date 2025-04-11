import TopPicksCard from "../shared/TopPicksCard";

/* eslint-disable react/prop-types */
const MenuCarousel = ({ resMenuTopPicks, resInformation }) => {
  console.log(resMenuTopPicks);
  const title = resMenuTopPicks?.[0]?.card?.card?.title;
  const carousel = resMenuTopPicks?.[0]?.card?.card?.carousel;
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="w-full overflow-x-auto hide-scrollbar shrink-0 flex flex-nowrap gap-4 mt-4">
        {carousel?.map((item) => (
          <div key={item?.bannerId} className="flex relative">
            <TopPicksCard
              topPicksData={item?.dish}
              resInformation={resInformation}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCarousel;
