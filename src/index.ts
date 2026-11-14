import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: 'json' };
import prisma from './config/prisma.js'; 
import patientRouter from "./Routes/routePatient.js";
import doctorRouter from "./Routes/routeDoctor.js";
import authRouter from "./Routes/auth.routes.js";
import appointmentRoutes from "./Routes/route.appointment.js"; 
import specialtyRouter from './Routes/routeSpecialty.js' 



const app = express();
app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/', appointmentRoutes);
app.use('/api', authRouter);
app.use('/api', patientRouter);
app.use('/api', doctorRouter);
app.use('/api', specialtyRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
 
