import type { Request, Response } from 'express';

import { 
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  softDeleteDoctor
} from "../Models/doctor.model";

export async function getAllDoctor(req: Request, res: Response) { 
  try {
    const specialtyName = req.query.specialty as string | undefined;

    const doctors = await getAllDoctors(specialtyName);

    res.status(200).json(doctors);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener doctores", message: error.message });
  }
}

export async function getDoctorsById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const doctor = await getDoctorById(id);//no necesito colocar where

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el doctor' });
  }
}
export async function createDoctors(req: Request, res: Response) {
  try {
    const newDoctor = await createDoctor({
  name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      specialty: { connect: { id: Number(req.body.idSpecialty) } },//al usara createinput debo usar aca la relacion y no el campo numerico 
    });          //para conectar la especialidad con el doctor, prisma completa la informacion con la del nuevo doctor
  
    res.status(201).json(newDoctor)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "error al crear doctor", message: error.message });
  }
}

export async function deleteDoctor(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await softDeleteDoctor(id);

    res.status(200).json({ message: "Doctor desactivado correctamente" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "El doctor no existe" });
    }
    res.status(500).json({ error: "Error al eliminar el doctor", message: error.message });
  }
}

export async function updateDoctors(req: Request, res: Response) {
  try {
  const id = Number(req.params.id);
  const data = req.body;
  const updatedDoctor = await updateDoctor(id, data);
  res.status(200).json(updatedDoctor);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "El doctor no existe" });
    }
    res.status(500).json({ error: "Error al actualizar el doctor", message: error.message });
  }
}




