import { Router, type Router as ExpressRouter} from "express";
import { Specialities, getSpecialtyById, CreateSpecialty, SoftDeleteSpecialty} from "../Controllers/specialtyController";
import { verifyToken } from "../Middlewares/auth.middleware";
import { authorize } from "../Middlewares/authorize.middleware";
import { validateSpecialty } from "../Middlewares/validateSpecialty";


const router: ExpressRouter = Router();
router.get("/specialties", verifyToken,authorize("RECEPTION"), Specialities)
router.get("/specialtyById/:id", verifyToken, getSpecialtyById)
router.put("/create", verifyToken,validateSpecialty, authorize("MANAGEMENT", "RECEPTION"),CreateSpecialty)
router.delete("/delete/:id", verifyToken,validateSpecialty, authorize("MANAGEMENT"), SoftDeleteSpecialty)
export default router;



