import React, { useState } from 'react';

/**
 * INTERFAZ GENÉRICA PARA COLUMNAS
 * T representa el tipo de dato de la entidad (ej: Estudiante).
 */
interface Columna<T> {
  clave: keyof T; // Asegura que la clave exista en el objeto T
  titulo: string;
}

interface DataTableProps<T> {
  datos: T[];
  columnas: Columna<T>[];
}

/**
 * COMPONENTE DATATABLE GENÉRICO
 * Justificación: Permite renderizar cualquier tipo de entidad con seguridad de tipos.
 */
export function DataTable<T extends { id: string | number }>({ datos, columnas }: DataTableProps<T>) {
  
  /**
   * ESTADO DE EDICIÓN CON UTILITY TYPE 'Partial'
   * Justificación: Usamos Partial<T> porque durante la edición, el usuario 
   * puede tener campos incompletos.
   */
  const [filaEditando, setFilaEditando] = useState<Partial<T> | null>(null);

  const iniciarEdicion = (fila: T) => {
    setFilaEditando(fila); // Copia la fila actual al estado parcial
  };

  return (
    <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columnas.map((col) => (
            <th key={String(col.clave)}>{col.titulo}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((item) => (
          <tr key={item.id}>
            {columnas.map((col) => (
              <td key={String(col.clave)}>{String(item[col.clave])}</td>
            ))}
            <td>
              <button onClick={() => iniciarEdicion(item)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}