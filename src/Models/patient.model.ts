import  prisma  from "../config/prisma";
import type { Patient, Prisma } from "../../generated/prisma/client"; //patient y prisma solo palabras de verificacion


export const getAllPatients = async (): Promise<Patient[]> => {
  return await prisma.patient.findMany({
    orderBy: { id: "asc" },
  });
};

export function getPatientById(id: number) {
  return prisma.patient.findUnique({
    where: { id },
    include: {
      agendas: {
        include: { doctor: { include: { specialty: true } } },
        orderBy: { appointment: 'desc' }
      }
    }
  })
}
   
export const createPatient = async (data: Prisma.PatientCreateInput): Promise<Patient> => {
  return await prisma.patient.create({
    data,
  });
};
 export const UpdatePatient = async (
  id: number,
  data: {
    name?: string
    dateBirth?: Date
    phone?: string
    email?: string
  }
) => {
  return await prisma.patient.update({
    where: { id },
    data,
  })
}
 