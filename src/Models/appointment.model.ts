import  prisma  from "../config/prisma";




//todas las citas 
export  function getDailyCutoff(date: string) {
  const startOfDay = new Date(`${date}T00:00:00`)
  const endOfDay = new Date(`${date}T23:59:59`)

  return prisma.agenda.groupBy({
    by: ['status'],
    where: {
      appointment: { gte: startOfDay, lte: endOfDay },
      status: { in: ['COMPLETADA', 'CANCELADA'] }
    },
    _count: { status: true }
  })
}
//citas por especialidades
export function getAppointmentsBySpecialty() {
  return prisma.$queryRaw`
    SELECT s.name_specialty AS specialty, COUNT(a.id)::int AS total_appointments
    FROM agenda a
    INNER JOIN specialties s ON s.id = a.id_specialty
    GROUP BY s.name_specialty
    ORDER BY total_appointments DESC
  `;
}
//crear cita
// al tener prisma todas esta columnas en las tablas puedo pasar directamente la info
export function createAppointment(data: {
  appointment: Date | string;
  idPatient: number;
  idDoctor: number;
  idSpecialty: number;
}) {
  return prisma.agenda.create({ data });
}
//agenda de doctores
export function getDoctorAgenda(doctorId: number, from?: Date, to?: Date) {
  return prisma.agenda.findMany({
    where: {
      idDoctor: doctorId,
      ...(from && to ? { appointment: { gte: from, lte: to } } : {})
    },
    include: { patient: true },
    orderBy: { appointment: 'asc' }
  })

}
//actualizar citas 
export function updateAppointmentStatus(id: number, status: 'COMPLETADA' | 'CANCELADA') {
  return prisma.agenda.update({
    where: { id },
    data: { status }
  })
}
//borrar citas 
// se pide el id de la cita y se borra toda info de esa cita 
export function deleteAppointment(id: number) {
  return prisma.agenda.delete({
    where: { id },
  });
}
