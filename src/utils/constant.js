export const BASE_URL = `https://cors-anywhere.herokuapp.com/`;
export const IMG_URL = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/`;
export const IMG_CARD_URL_2 = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/`;
export const IMG_OFFER_LOGO = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/`;
export const IMG_MENU = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/`;
export const IMG_POPULAR_CUSINESS = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/`;
export const IMG_SUGGESTION = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/`;
export const IMG_SEARCH_DISH = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/`;
export const IMG_SEARCH_DISH_BANNER = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/`;
export const IMG_SEARCH_RES = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/`;
export const CART_IMG = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_132,h_132,c_fill/`;
export const SWIGGY_LOGO = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/SwiggyLogoOrange.png`;
export const UNSERVICEABLE_IMG = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png`;
export const LOGIN_IMG = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r`;
export const TOP_PIC_IMG = `https://media-assets.swiggy.com/swiggy/image/upload/`;

export const CUPPON_LOGO = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/`;
export const LAT = 22.5743545;
export const LNG = 88.3628734;

export const getFormatedPrice = (price) => {
  const formatedPrice = Math.floor(price * 100) / 100;
  return formatedPrice;
};

// for prefetch => https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=22.723616&lng=88.350805

// For Suggestion =>. https://www.swiggy.com/dapi/restaurants/search/suggest?lat=22.723616&lng=88.350805&str=New%20&trackingId=undefined&includeIMItem=true

// When i clicked Suggestion => https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.723616&lng=88.350805&str=Biryani&submitAction=ENTER

// when i clicked Popular => https://www.swiggy.com/dapi/restaurants/search/v3?lat=22.723616&lng=88.350805&str=Pizza&submitAction=SUGGESTION

// 22.5743545
// 88.3628734
// 22.723616
// 88.350805
