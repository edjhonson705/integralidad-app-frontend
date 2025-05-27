import type { ParticipacionDeportes } from "../../modelos/estudiantes";

/**
 * Controlador paa Gestionar datos de la entidad Estudiante
 */
export class ControladorDeportes {

    /**
     * Obtener el listado de estudiantes desde la API
     * @returns 
     */
    static async obtenerListado(): Promise<ParticipacionDeportes[]> {
        try {
            const response = await fetch('http://localhost:3000/participacion-deporte');
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            const data: ParticipacionDeportes[] = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener la participación deportiva:', error);
        }
        return [];
    }

    /**
     * Enviar los datos del estudiante a crear a la API
     */
    static async crear(estudiante: ParticipacionDeportes): Promise<boolean> {
        try {
            const response = await fetch('http://localhost:3000/participacion-deporte', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(estudiante),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar la participación deportiva');
            }
            return true;
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
        return false;
    };

    /**
    * Enviar los datos del estudiante a modificar a la API
    */
    static async modificar(estudiante: ParticipacionDeportes): Promise<boolean> {
        try {
            if (estudiante.id) {
                const response = await fetch('http://localhost:3000/participacion-deporte/' + estudiante.id?.toString(), {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(estudiante),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al modificar la participación deportiva');
                }
                return true;
            }
        } catch (error) {
            console.error('Error al modificar la participación deportiva', error);
        }
        return false;
    };

    /**
     *  
     */
    static async eliminar(id: string): Promise<boolean> {
        try {
            const response = await fetch('http://localhost:3000/participacion-deporte/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar la participación deportiva');
            }
            return true;
        } catch (error) {
            console.error('Error al eliminar la participación deportiva:', error);
        }
        return false;
    };
}