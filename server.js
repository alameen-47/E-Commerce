import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

//configure env
dotenv.config();

//database  config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO RAWAD MALL</h1>");
});
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan
      .white
  );
});
