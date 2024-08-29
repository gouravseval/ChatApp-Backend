import { Router } from "express";
import { fetchUsers } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { fetchProfilePic, uploadPic } from "../controller/profilePic.controller.js";
import { uploadFile } from "../middleware/multer.middleware.js";

const router = Router()
    
router.route("/").get(protectRoute, fetchUsers)
router.route("/profilePic").post(protectRoute, uploadFile.single("profilePic") , uploadPic)
router.route("/profilePic").get(protectRoute, fetchProfilePic)

export default router