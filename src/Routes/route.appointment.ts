import { Router, type Router as ExpressRouter} from "express";
import { validateappointment } from "../Middlewares/validateappointment.js";


const router: ExpressRouter = Router();

import { verifyToken } from "../Middlewares/auth.middleware";
import { authorize } from "../Middlewares/authorize.middleware";
import { getallappointments, 
  appointmentBySpecialty, 
  createAppointments,
  DoctorAgenda,
  deleteAppointments,
  updateStatus } from "../Controllers/appointment.Controller.js";

router.put("/update/:id",verifyToken, authorize("DOCTOR","RECEPTION"), updateStatus)
router.delete("/delete/:id", verifyToken, authorize("RECEPTION","MANAGEMENT"),deleteAppointments)
router.get("/byspecialty", verifyToken, authorize("RECEPTION"), appointmentBySpecialty ) 
router.get("/allappointments", verifyToken, authorize("RECEPTION", "MANAGEMENT"), getallappointments  )
router.post("/create/", verifyToken, authorize("RECEPTION"), validateappointment, createAppointments);
router.get("/DoctorAgenda/:doctorId", verifyToken, authorize("DOCTOR", "RECEPTION"), DoctorAgenda)
export default router;