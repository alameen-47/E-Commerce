import express from "express";
import colors from "colors";

import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import translationRoute from "./routes/translationRoute.js";
//translation i18n
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import router from "./routes/authRoute.js";
import formidable from "express-formidable";
const apiKey = process.env.G_TRANSLATION_API_KEY;

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json",
    },
  });

//configure env
dotenv.config();

//database  config
connectDB();

//rest object
const app = express();
app.use(middleware.handle(i18next));
//
// app.use(formidable());
// ******
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, "./client/build")));
//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO RAWAD MALL</h1>");
});

//PORT
const PORT = process.env.PORT || 8081;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan
      .white
  );
});
//TRANSLATIONS
app.use("/api/v1", translationRoute);
