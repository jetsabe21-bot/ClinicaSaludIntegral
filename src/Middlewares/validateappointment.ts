import { z } from 'zod'
import type { Request, Response, NextFunction } from 'express';

export const appointmentSchema = z.object({
  patientId: z.number().int().positive(),
  doctorId: z.number().int().positive(),
  appointment: z.coerce.date().min(new Date(), 'No puedes agendar una cita en una fecha que ya pasó'),
  reason: z.string().optional()
})

export const appointmentStatusSchema = z.object({
  status: z.enum(['COMPLETADA', 'CANCELADA'])
})

export const validateappointment = (req: Request, res: Response, next: NextFunction) => {
  const result = appointmentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: result.error.issues,
    });
  }

  req.body = result.data;
  next();
};