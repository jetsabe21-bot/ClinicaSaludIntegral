import  prisma  from "../config/prisma";
import type { Prisma } from "../../generated/prisma/client.js";



export function getAllDoctors(specialtyName?: string) {
  return prisma.doctor.findMany({
    where: specialtyName
      ? { specialty: { name: { equals: specialtyName, mode: 'insensitive' } } }
      : undefined,
    include: { specialty: true },
  });
}

export function getDoctorById(id: number) {
  return prisma.doctor.findUnique({
    where: { id },
  });
}

export function createDoctor(data: Prisma.DoctorCreateInput) {
  return prisma.doctor.create({
    data,
  });
}

export function updateDoctor(id: number, data: Prisma.DoctorUpdateInput) {
  return prisma.doctor.update({
    where: { id },
    data,
  });
}

export function softDeleteDoctor(id: number) {
  return prisma.doctor.update({
    where: { id },
    data: { isActive: false },
  });
}