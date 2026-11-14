import { Router, type Router as ExpressRouter} from "express";
import { Patients, PatientById, createPatients, updatePatient } from "../Controllers/patientController";
import { validatePatient } from "../Middlewares/validatepatient.js";


const router: ExpressRouter = Router();

import { verifyToken } from "../Middlewares/auth.middleware";
import { authorize } from "../Middlewares/authorize.middleware";

router.get("/patients", verifyToken, Patients);
router.get("/patients/:id", verifyToken, PatientById);
router.post("/patients", verifyToken, authorize("RECEPTION"),validatePatient, createPatients);
router.put("/update",verifyToken, authorize("DOCTOR","RECEPTION"), updatePatient)

export default router;