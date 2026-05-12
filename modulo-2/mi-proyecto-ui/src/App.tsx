import { useState } from 'react';
import type { Estudiante, DatosEdicionEstudiante } from './estudiante';


/**
 * COMPONENTE GENÉRICO <T>
 * Cumple con el requisito de usar Genéricos para renderizar contenido flexible.
 */
interface CardGenericaProps<T> {
  titulo: string;
  contenido: T;
}

function CardGenerica<T>({ titulo, contenido }: CardGenericaProps<T>) {
  return (
    <div style={{ 
      border: '2px solid #646cff', 
      padding: '20px', 
      borderRadius: '12px', 
      margin: '20px auto',
      maxWidth: '500px',
      backgroundColor: '#242424',
      color: 'white',
      textAlign: 'left'
    }}>
      <h2 style={{ borderBottom: '1px solid #646cff', paddingBottom: '10px' }}>
        {titulo}
      </h2>
      <pre style={{ fontSize: '14px', lineHeight: '1.5', overflowX: 'auto' }}>
        {JSON.stringify(contenido, null, 2)}
      </pre>
    </div>
  );
}

/**
 * COMPONENTE PRINCIPAL
 */
function App() {
  // Estado inicial del estudiante siguiendo la interfaz del Módulo 2
  const [alumno, setAlumno] = useState<Estudiante>({
    id: "U-2026",
    nombre: "Edrick",
    email: "edrick@u.com",
    carrera: "Desarrollo con TypeScript"
  });

  /**
   * FUNCIÓN DE EDICIÓN (Módulo 3)
   * Utiliza el Utility Type DatosEdicionEstudiante (Partial + Omit)
   */
  const manejarActualizacion = (cambios: DatosEdicionEstudiante) => {
    console.log("Aplicando cambios seguros:", cambios);
    setAlumno(prev => ({ ...prev, ...cambios }));
  };

  // --- PRUEBA DE ERROR DE TYPESCRIPT ---
  // Si descomentas la línea de abajo, verás que TypeScript marca error en 'id'
  // porque el tipo DatosEdicionEstudiante lo omite explícitamente.
  // manejarActualizacion({ id: "NUEVO-ID", nombre: "Intento Fallido" }); 

  return (
    <div style={{ 
      textAlign: 'center', 
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      padding: '40px' 
    }}>
      <h1 style={{ color: '#646cff' }}>🎓 Laboratorio 3: React + TypeScript</h1>
      <p>Interfaces, Genéricos y Utility Types funcionando juntos.</p>
      
      {/* Visualización mediante componente Genérico */}
      <CardGenerica<Estudiante> 
        titulo="Perfil del Estudiante" 
        contenido={alumno} 
      />

      {/* Simulación de edición usando Partial<Omit<...>> */}
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => manejarActualizacion({ nombre: "Edrick Actualizado" })}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Simular Cambio de Nombre
        </button>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '8px', 
        display: 'inline-block',
        color: '#333'
      }}>
        <p>
          💡 <strong>Verificación:</strong> El <code>id</code> es <code>readonly</code> en la interfaz. 
          <br /> El tipo de edición prohíbe modificarlo mediante <code>Omit</code>.
        </p>
      </div>
    </div>
  );
}

export default App;