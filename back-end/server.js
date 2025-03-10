import express from "express";
import dotenv from "dotenv";
import { DBConnect } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Server is up!");
// });

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/front-end/MERN-website/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "front-end/MERN-website",  "dist", "index.html"));
    });
}

app.listen(port, () => {
    DBConnect();
    console.log("Server started at http://localhost:" + port);
});

