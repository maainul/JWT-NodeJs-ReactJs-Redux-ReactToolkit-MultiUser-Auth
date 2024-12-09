import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const setupRoutes = (app) => {
  app.use("/auth/", authRoutes);
  app.use("/", blogRoutes);
};

export default setupRoutes;
