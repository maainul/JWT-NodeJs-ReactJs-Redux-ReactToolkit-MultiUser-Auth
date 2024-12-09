import express from "express";
import {
  loginCtrl,
  registerCtrl,
  logoutCtrl,
} from "../controllers/authCtrl.js";

const router = express.Router();

router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.post("/logout", logoutCtrl);

export default router;
