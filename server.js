// import express from "express";
// import cors from "cors";
// import axios from "axios";
// // import cheerio from "cheerio";
// import * as cheerio from "cheerio";

// const app = express();

// const corsOptions = {
//   origin: "http://localhost:5173",
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// async function getCsrfToken() {
//   try {
//     const headers = {
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
//       "Accept-Language": "en-US,en;q=0.9",
//       Referer: "https://www.swiggy.com/",
//       "Accept-Encoding": "gzip, deflate, br",
//     };
//     const response = await axios.get("https://www.swiggy.com/home", {
//       headers,
//     });
//     if (response.status !== 200) {
//       console.error("Swiggy homepage request failed:", response.status);
//       return null;
//     }
//     const $ = cheerio.load(response.data);
//     const csrfToken = $('meta[name="csrf-token"]').attr("content");
//     if (!csrfToken) {
//       console.error("CSRF token not found in Swiggy homepage");
//       return null;
//     }
//     return csrfToken;
//   } catch (error) {
//     console.error("Error getting CSRF token:", error);
//     return null;
//   }
// }
// app.post("/swiggy-proxy", async (req, res) => {
//   try {
//     const csrfToken = await getCsrfToken();
//     if (!csrfToken) {
//       return res.status(500).json({ error: "Could not retrieve CSRF token" });
//     }
//     const requestBody = {
//       ...req.body,
//       _csrf: csrfToken,
//     };

//     const response = await axios.post(
//       "https://www.swiggy.com/dapi/restaurants/list/update",
//       requestBody,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "User-Agent": req.headers["user-agent"] || "Mozilla/5.0",
//           Referer: "https://www.swiggy.com/home",
//           Cookie: req.headers.cookie || "",
//           "x-csrf-token": csrfToken,
//         },
//       }
//     );

//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, X-CSRF-Token, Cookie"
//     );

//     res.json(response.data);
//   } catch (error) {
//     console.error("Error in proxy:", error.message);

//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Content-Type, X-CSRF-Token, Cookie"
//     );

//     res.status(error.response?.status || 500).json({ error: error.message });
//   }
// });

// app.options("/swiggy-proxy", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, X-CSRF-Token, Cookie"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   res.sendStatus(200);
// });

// app.listen(4000, () => console.log("Proxy server running on port 4000"));
