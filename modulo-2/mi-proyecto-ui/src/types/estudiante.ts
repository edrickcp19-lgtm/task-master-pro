export interface Estudiante {
    readonly id: string;
    nombre: string;
    email: string;
    carrera: string;
}

export type DatosEdicionEstudiante = Partial<Omit<Estudiante, "id">>;