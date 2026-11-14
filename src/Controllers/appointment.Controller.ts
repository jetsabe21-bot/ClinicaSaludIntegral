import type { Request, Response } from 'express';
import { 
  getDailyCutoff, 
  getAppointmentsBySpecialty, 
  createAppointment,
  getDoctorAgenda,
  deleteAppointment,
  updateAppointmentStatus } from '../Models/appointment.model';

  // todas las citas 
export async function getallappointments(req: Request, res: Response) {
   try {
    const date = req.query.date as string; // extrae la fecha de la cita de manera tradicional
    const appointments = await getDailyCutoff(date); // llama la funcion de model y se guarda la info

    res.status(200).json(appointments);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener citas", message: error.message });
  }
}

// cita por especialidad
export async function appointmentBySpecialty(req: Request, res: Response) {
try {
  const appointments = await getAppointmentsBySpecialty();// aqui ejecuta la funcion 

  res.status(200).json(appointments);
} catch (error: any) {
  console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener citas por especialidades", message: error.message });
  }
  
}

//crear una cita 
export async function createAppointments(req: Request, res: Response) {
  try {
    const { appointment, idPatient, idDoctor, idSpecialty } = req.body;

    if (!appointment || !idPatient || !idDoctor || !idSpecialty) {
      res.status(400).json({ error: "Todos los campos son obligatorios" });
      return;
    }

    const newAppointment = await createAppointment({ //guardar los datos pedidos a model 
      appointment,
      idPatient: Number(idPatient),
      idDoctor: Number(idDoctor),
      idSpecialty: Number(idSpecialty),
    });

    res.status(201).json(newAppointment);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al crear la cita", message: error.message });
  }
}
//agenda de los doctores
export async function DoctorAgenda(req: Request, res: Response){
  try {
    const doctorId = Number(req.params.doctorId);//de quien es la agenda
    const { from, to } = req.query;//que fechas ver 

    const fromDate = from ? new Date(from as string) : undefined;//se evalua si se envio la info la transforma en date, sino se guarda vacio
    const toDate = to ? new Date(to as string) : undefined;

    const agenda = await getDoctorAgenda(doctorId, fromDate, toDate);//se guarda en la variable, espera a model con la info ya establecida 
    res.status(200).json(agenda)

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la agenda del doctor", message: error.message });
  }
}
//borrado de citas 
export async function deleteAppointments(req: Request, res: Response){
  try {
    const id = Number(req.params.id);//number con mayuscula es una funcion y minuscula un tipo de dato 
    await deleteAppointment(id);
    res.status(200).json({message:"cita eliminada correctamente"});
  } catch (error:any) {
   console.error(error);
   res.status(500).json({error: "error al eliminar la cita" ,message: error.message })
    
  }
}
//actualizar
export async function updateStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { status } = req.body;

  try {
    const cita = await updateAppointmentStatus(id, status);
    return res.status(200).json(cita);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'La cita no existe' });
    }
    return res.status(500).json({ message: 'Error al actualizar la cita' });
  }
}