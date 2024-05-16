import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import passport from "./utils/passport.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import upload from "./upload.js";


dotenv.config();

connectDB();

const PORT = process.env.PORT || 7000;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    credentials: true,
  })
);

app.use(cookieParser());
passport(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files from the "images" directory
app.use("/images", express.static(path.join(__dirname, "database", "images")));

// app.get("/", (req, res) => {
//   res.send("Api is ✔️ ");
// });

app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.post("/upload", upload.array("images"), (req, res) => {
  // req.files is array of `images` files
  const fileInfos = req.files.map((file) => ({
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
  }));

  res.json(fileInfos);
}); 

app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === 'production') { 
  const __dirname = path.resolve()
  app.use("/uploads", express.static(path.join(__dirname, "uploads")))
  app.use(express.static(path.join(__dirname, "/client/build")))
  app.use("*", (req, res) => 
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  )
} else {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.get("/", (req, res) => {
    res.send("Api is ✔️ ");
  })
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is 🏃‍♂️ on port ${PORT}`);
});


// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
// import connectDB from "./config/db.js";
// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// import cookieParser from "cookie-parser";
// import passport from "./utils/passport.js";
// import authRoutes from "./routes/authRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import upload from "./upload.js";


// dotenv.config();

// connectDB();

// const PORT = process.env.PORT || 7000;

// const app = express();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   next();
// });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(
//   cors({
//     origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
//     methods: "GET, POST, PATCH, DELETE, PUT",
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// passport(app);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// // Serve static files from the "images" directory
// app.use("/images", express.static(path.join(__dirname, "database", "images")));

// app.get("/", (req, res) => {
//   res.send("Api is ✔️ ");
// });

// app.use("/api", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/auth", authRoutes);
// app.use("/api/orders", orderRoutes);

// app.post("/upload", upload.array("images"), (req, res) => {
//   // req.files is array of `images` files
//   const fileInfos = req.files.map((file) => ({
//     originalName: file.originalname,
//     filename: file.filename,
//     path: file.path,
//   }));

//   res.json(fileInfos);
// });

// app.use(express.static(path.join(__dirname, "public")));

// // Serve static files from the React app in production
// if (process.env.NODE_ENV === "production") {
//   // Adjust the path to the build directory
//   app.use(express.static(path.join(__dirname, "..", "client", "build")));

//   app.get("*", (req, res) => {
//     // Adjust the path to the index.html file
//     res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
//   });
// }

// app.use(notFound);
// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`server is 🏃‍♂️ on port ${PORT}`);
// });

