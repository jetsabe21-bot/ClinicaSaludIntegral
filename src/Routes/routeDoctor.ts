import { Router, type Router as ExpressRouter} from "express";
import { getAllDoctor, getDoctorsById, createDoctors, updateDoctors, deleteDoctor} from "../Controllers/doctorController";
import { verifyToken } from "../Middlewares/auth.middleware";
import { authorize } from "../Middlewares/authorize.middleware";
import { validateDoctor } from "../Middlewares/validatedoctor";


const router: ExpressRouter = Router();

router.get("/doctors", verifyToken, getAllDoctor);
router.get("/doctors/:id",verifyToken, getDoctorsById );
router.post("/doctors", verifyToken, validateDoctor, authorize("MANAGEMENT", "RECEPTION"),createDoctors );
router.delete("/softdelete/:id", verifyToken, authorize("MANAGEMENT"),deleteDoctor)
//recordar que cuando use req.params.id debo colocar id en la ruta 
router.put("/update/:id", verifyToken,validateDoctor, authorize("MANAGEMENT", "RECEPTION"),updateDoctors)

export default router;