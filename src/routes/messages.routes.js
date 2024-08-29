import { Router } from "express";
import { getMessage, messageSend } from "../controller/messages.controller.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const router = Router()

router.route("/send/:id").post(protectRoute, messageSend)
router.route("/:id").get(protectRoute, getMessage)

export default router