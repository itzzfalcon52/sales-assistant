import express from "express";
import vapiRoutes from "./routes/vapiRoutes.js";
import vapiEventRoutes from "./routes/vapiEventRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/vapi", vapiRoutes);
app.use("/api/vapi", vapiEventRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

export default app;