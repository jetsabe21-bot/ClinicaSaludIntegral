import  prisma  from "../config/prisma";
import type { Prisma } from "../../generated/prisma/client.js";



export function allSpecialities(specialtyName?: string) {
  return prisma.specialty.findMany({
    where: specialtyName
      ? {
          nameSpecialty: {
            contains: specialtyName,
            mode: 'insensitive',
          },
        }
      : undefined,
  })
}

export function specialtyById(id:number){
    return prisma.specialty.findUnique({
        where: {id},
    })
} 
 export function createSpecialty(data: Prisma.SpecialtyCreateInput){
    return prisma.specialty.create({
        data,
    })
 }

 export function softdeleteSpecialty(id: number) {
    return prisma.specialty.update({
        where: {id},
        data: {isActive: false},
    });
 }