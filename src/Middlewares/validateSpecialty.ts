import { z } from 'zod'
import type { Request, Response, NextFunction } from 'express'

export const specialtySchema = z.object({
  nameSpecialty: z
    .string()
    .trim()
    .min(8, 'El nombre de la especialidad debe tener al menos 8 caracteres'),
})

export const validateSpecialty = (req: Request, res: Response, next: NextFunction) => {
  const result = specialtySchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: result.error.issues,
    })
  }

  req.body = result.data
  next()
}