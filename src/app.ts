import express from "express";
import vapiRoutes from "./routes/vapiRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/vapi", vapiRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

export default app;