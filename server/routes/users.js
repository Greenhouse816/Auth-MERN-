import express from "express";
import {
  changePassword,
  googleLogin,
  setPassword,
  signin,
  signup,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();
//          Routes And Actions
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/googleLogin", googleLogin);
router.post("/setPassword", auth, setPassword);
router.post("/changePassword", auth, changePassword);
export default router;
