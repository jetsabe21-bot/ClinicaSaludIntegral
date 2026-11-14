import { z } from 'zod'
import type { Request, Response, NextFunction } from 'express'

export const doctorSchema = z.object({
  name: z.string().min(2, 'El nombre del doctor es obligatorio'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  email: z.string().email('El correo no tiene un formato válido'),
  idSpecialty: z.coerce.number().int().positive('El ID de la especialidad es obligatorio'),
})

export const validateDoctor = (req: Request, res: Response, next: NextFunction) => {
  const result = doctorSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: result.error.issues,
    })
  }

  req.body = result.data
  next()
}
