import prisma from '../src/config/prisma';

const seedData = [
  {
    name: 'Cardiología',
    description: 'Diagnóstico y tratamiento de enfermedades del corazón.',
    doctors: [
      {
        name: 'Dr. Carlos Mendoza',
        phone: '2511516510616',
        email: 'cmendoza@clinica.com',
      },
      {
        name: 'Dra. Laura Gómez',
        phone: '5485451521452',
        email: 'lgomez@clinica.com',
      },
    ],
  },
  {
    name: 'Pediatría',
    description: 'Atención médica integral para bebés, niños y adolescentes.',
    doctors: [
      {
        name: 'Dra. Ana Torres',
        phone: '54139792134',
        email: 'atorres@clinica.com',
      },
      {
        name: 'Dr. Javier Rojas',
        phone: '8451234697',
        email: 'jrojas@clinica.com',
      },
    ],
  },
  {
    name: 'Dermatología',
    description: 'Cuidado y tratamiento de afecciones de la piel.',
    doctors: [
      {
        name: 'Dr. Andrés Silva',
        phone: '48124563115',
        email: 'asilva@clinica.com',
      },
      {
        name: 'Dra. Sofía Vargas',
        phone: '87541345699',
        email: 'svargas@clinica.com',
      },
    ],
  },
];

async function main() {
  console.log('Iniciando inserción de datos de prueba...');

    for (const item of seedData) {

    let specialty = await prisma.specialty.findFirst({
      where: { nameSpecialty: item.name },
    });

    if (!specialty) {
      specialty = await prisma.specialty.create({
        data: {
          nameSpecialty: item.name,
        },
      });
    }



    for (const doc of item.doctors) {
      await prisma.doctor.upsert({
        where: { email: doc.email },
        update: {},
        create: {
          name: doc.name,
          phone: doc.phone,
          email: doc.email,
          idSpecialty: specialty.id,
        },
      });
    }
  }

  console.log('¡Especialidades y médicos cargados con éxito!');
}

main()
  .catch((error) => {
    console.error('Error ejecutando el seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
