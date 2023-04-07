import { Router } from "express";
import { route as adRoute } from "./ad";
import { route as commentRoute } from "./comment";
import { route as userRoute } from "./user";

const router = Router();

router.use("/ad", adRoute);
router.use("/comment", commentRoute);
router.use("/user", userRoute);

export { router };
