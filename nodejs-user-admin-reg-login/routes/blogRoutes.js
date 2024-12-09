import express from "express";
import {
  createBlogCtrl,
  deleteBlogCtrl,
  editBlogCtrl,
  listBlogCtrl,
  showBlogCtrl,
} from "../controllers/blogCtrl.js";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/admin/blog/create",
  authenticate,
  authorizeRoles(["admin"]),
  createBlogCtrl
);
router.get("/blog/list", listBlogCtrl);
router.get("/blog/:id", showBlogCtrl);
router.put(
  "/admin/blog/:id",
  authenticate,
  authorizeRoles(["admin"]),
  editBlogCtrl
);
router.delete(
  "/admin/blog/:id",
  authenticate,
  authorizeRoles(["admin"]),
  deleteBlogCtrl
);

export default router;
