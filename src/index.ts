import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./config/database";
import ApiError from "./utils/apiError";
import errorMiddleware from "./middlewares/errorMiddleware";
//routes import
import categoryRoute from "./routes/categoryRoute";
import subCategoryRoute from "./routes/subCategoryRoute";
import brandRoute from "./routes/brandRoute";
import productRoute from "./routes/productRoute";

//Config
dotenv.config();
//Database
dbConnection();
//App
const app: Application = express();

//middleware
if (process.env.NODE_ENV === "development") {
  console.log(`${process.env.NODE_ENV} mode`);
  app.use(morgan("dev"));
}
app.use(express.json());
//Routes
app.use("/api/categories", categoryRoute);
app.use("/api/sub-categories", subCategoryRoute);
app.use("/api/brands", brandRoute);
app.use("/api/products", productRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//error handler middleware for express
app.use(errorMiddleware);
//Server
const port: number = Number(process.env.PORT) || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//handle rejection outside express
process.on("unhandledRejection", (err: any) => {
  console.log(`UNHANDLED REJECTION! ${err.name} => ${err.message}`);
  server.close(() => {
    console.log("Shutting down due to unhandled rejection");
    process.exit(1);
  });
});
