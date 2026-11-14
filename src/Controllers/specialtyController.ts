import type { Request, Response } from 'express';
import {
    allSpecialities,
    specialtyById,
    createSpecialty,
    softdeleteSpecialty

}from "../Models/specialty.model";


export async function Specialities(req: Request, res: Response) {
  try {
  
    const specialtyName = req.query.nameSpecialty as string 

    const specialties = await allSpecialities(specialtyName)

    res.status(200).json(specialties)
  } catch (error: any) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error al obtener especialidades', message: error.message })
  }
}
 export async function getSpecialtyById(req: Request, res:Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
      return res.status(400).json({ error: 'El ID debe ser un número válido' })
    }

        const specialty = await specialtyById(id);
        if (!specialty){
            return res.status(404).json({error: 'especialidad no encontrada'}) 
        }
        
     res.status(200).json(specialty)
  } catch (error: any) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Error al obtener especialidades', message: error.message })
  }
}
 export async function CreateSpecialty(req: Request, res: Response) {
    try {
        const { nameSpecialty } = req.body
        const newSpecialty = await createSpecialty({
         nameSpecialty,
        })
    res.status(201).json(newSpecialty)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "error al crear especialidad", message: error.message });
  }
}
 export async function SoftDeleteSpecialty(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
            await softdeleteSpecialty(id);
            
    res.status(200).json({ message: "Especialidad desactivada correctamente" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "La especialidad no existe" });
    }
    res.status(500).json({ error: "Error al eliminar el doctor", message: error.message });
  }
}