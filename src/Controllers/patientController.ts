import type { Request, Response } from 'express'
import {
  getAllPatients,
  getPatientById,
  createPatient,
  UpdatePatient 
} from '../Models/patient.model'

export async function Patients(req: Request, res: Response){
  try {
  
    const patients = await getAllPatients()
    res.status(200).json(patients)
  } catch (error: any) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error al obtener pacientes', message: error.message })
  }
}

export async function PatientById(req: Request, res: Response){
  try {
    const id = Number(req.params.id)
    const patient = await getPatientById(id)

    if (!patient) {
      return res.status(404).json({ error: 'Paciente no encontrado' })
    }

    res.status(200).json(patient)
  } catch (error: any) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error al obtener el paciente', message: error.message })
  }
}

export async function createPatients (req: Request, res: Response) {
  try {
    const newPatient = await createPatient(req.body)
    res.status(201).json({
      data: newPatient,
    })
  } catch (error: any) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error al crear paciente', message: error.message })
  }
}

export async function updatePatient (req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const data = req.body

    
    const updatedPatient = await UpdatePatient(id, data)

    res.status(200).json(updatedPatient)
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'El paciente no existe' })
    }
    res
      .status(500)
      .json({ error: 'Error al actualizar el paciente', message: error.message })
  }
}

