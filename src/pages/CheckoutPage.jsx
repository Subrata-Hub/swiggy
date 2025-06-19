// import CheckOutCart from "../shared/CheckOutCart";

// const CheckoutPage = () => {
//   return (
//     <div className="mt-28 mx-1  sm:mx-[40px] md:mx-[30px] lg:mx-[50px] xl:mx-[140px]">
//       <div className="flex-col sm:flex justify-between gap-4">
//         <div className="w-full sm:w-3/4 order-2 sm:order-none">jbjbjbj</div>
//         <div className="mx-auto sm:mx-0 w-full sm:w-1/4 order-1 sm:order-none">
//           <CheckOutCart />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import CheckOutCart from "../shared/CheckOutCart";

const CheckoutPage = () => {
  return (
    <div className="mt-28 mx-1 sm:mx-[40px] md:mx-[30px] lg:mx-[50px] xl:mx-[140px]">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="w-full sm:w-3/4 order-2 lg:order-none px-0 sm:px-20 md:px-32 lg:px-0">
          jbjbjbj
        </div>{" "}
        <div className="mr-0 lg:mr-32 xl:mr-15 2xl:mr-15 w-full sm:w-1/4 order-1 lg:order-none px-0 sm:px-20 md:px-32 lg:px-0 ">
          <CheckOutCart />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
