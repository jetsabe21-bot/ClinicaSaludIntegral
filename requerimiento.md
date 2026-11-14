# ENTIDADES 
Recepcion, Paciente, Agenda_cita, Doctor, Gerencia, Especilidades

## Entidad: RECEPCION

| Atributo      | Tipo           | Notas       |
|---------------|----------------|-------------|
| id            | Número Entero  | [PK]        |
| id paciente   | numero entero  | Obligatorio |
| id doctor     | numero entero  | obligatotio |



## Entidad: PACIENTE

| Atributo      | Tipo           | Notas       |
|---------------|----------------|-------------|
| id            | Número Entero  | [PK]        |
| nombre        | Texto          | Obligatorio |
| fecha_nac     | date(feha)     | obligatotio |
| correo        | Texto          | unico/obligatorio|
| telefono      | Texto          | obligatorio |


# Entidad: AGENDA

| Atributo      | Tipo           | Notas       |
|---------------|----------------|-------------|
| id            | Número Entero  | [PK]        |
| fecha_cita    | date           | obligatorio |
| id_doctor     | numero entero  | obligatorio |
| id_especialidad| numero entero | obligatorio | 
| estado de la cita| string         | obligatorio |

# Entidad: DOCTOR

| Atributo      | Tipo           | Notas       |
|---------------|----------------|-------------|
| id            | Número Entero  | [PK]        |
| telefono      | numero         | obligatorio |
| correo        | Texto          | unico/obligatorio |
 


# Entity: GERENCIA 

| Atributo      | Tipo           | Notas       |
|---------------|----------------|-------------|
| id            | Número Entero  | [PK]        |
| id_agenda     | numero entero  | Obligatorio |




# Entity: ESPECIALIDAD 

| Atributo      | Tipo           | Notas       |
|---------------|----------------|-------------|
| id            | Número Entero  | [PK]        |
| nombre_espe...| Texto          | Obligatorio |


La recepcion puede atender muchos pacientes,
pero muchos pacientes pasan por una recepcion.
Un paciente puede agendar muchas citas, pero
una cita contiene un paciente.
Una cita es con un doctor, pero un doctor
puede tener varias citas.
Un doctor tiene una gerencia, y una gerencia tiene
muchos doctores.
