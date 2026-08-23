import express from "express";
import cors from "cors";
import vapiRoutes from "./routes/vapiRoutes.js";
import vapiEventRoutes from "./routes/vapiEventRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

const app = express();

app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

app.use("/api/vapi", vapiRoutes);
app.use("/api/vapi", vapiEventRoutes);
app.use(
    "/api/leads",
    leadRoutes
  );

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

export default app;