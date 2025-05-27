import type { ParticipacionCultura } from "../../modelos/estudiantes";

/**
 * Controlador paa Gestionar datos de la entidad Estudiante
 */
export class ControladorCultura {

    /**
     * Obtener el listado de estudiantes desde la API
     * @returns 
     */
    static async obtenerListado(): Promise<ParticipacionCultura[]> {
        try {
            const response = await fetch('http://localhost:3000/participacion-cultura');
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            const data: ParticipacionCultura[] = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener la participación cultural:', error);
        }
        return [];
    }

    /**
     * Enviar los datos del estudiante a crear a la API
     */
    static async crear(estudiante: ParticipacionCultura): Promise<boolean> {
        try {
            const response = await fetch('http://localhost:3000/participacion-cultura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(estudiante),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar la participación cultural');
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
    static async modificar(estudiante: ParticipacionCultura): Promise<boolean> {
        try {
            if (estudiante.id) {
                const response = await fetch('http://localhost:3000/participacion-cultura/' + estudiante.id?.toString(), {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(estudiante),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al modificar la participación cultural');
                }
                return true;
            }
        } catch (error) {
            console.error('Error al modificar la participación cultural', error);
        }
        return false;
    };

    /**
     * Eliminar
     */
    static async eliminar(id: string): Promise<boolean> {
        try {
            const response = await fetch('http://localhost:3000/participacion-cultura/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar la participación cultural');
            }
            return true;
        } catch (error) {
            console.error('Error al eliminar la participación cultural:', error);
        }
        return false;
    };
}