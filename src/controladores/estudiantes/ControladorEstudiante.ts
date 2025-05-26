import type { Estudiante } from "../../modelos/estudiantes";



/**
 * 
 */
export class ControladorEstudiante {

    /**
     * 
     * @returns 
     */
    static async obtenerListadoEstudiantes(): Promise<Estudiante[]> {

        try {
            const response = await fetch('http://localhost:3000/estudiante');

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            const data: Estudiante[] = await response.json();

            return data;

        } catch (error) {
            console.error('Error al obtener los estudiantes:', error);
            return []; // o puedes lanzar el error si prefieres manejarlo fuera
        }
    }

    /**
     * Enviar los datos del estudiante a crear a la API
     */
    static async crearEstudiante(estudiante: Estudiante): Promise<boolean> {

        try {
            const response = await fetch('http://localhost:3000/estudiante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(estudiante),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar el estudiante');
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
    static async modificarEstudiante(estudiante: Estudiante): Promise<boolean> {        

        try {

            if(estudiante.id){
                const response = await fetch('http://localhost:3000/estudiante/' + estudiante.id?.toString(), {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(estudiante),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al modificar el estudiante');
                }
    
                return true;
            }           

        } catch (error) {
            console.error('Error al modificar el estudiante', error);
        }

        return false;
    };

    /**
     * Eliminar
     */
    static async eliminarEstudiante(id: string): Promise<boolean> {

        try {
            const response = await fetch('http://localhost:3000/estudiante/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify(estudiante),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar el estudiante');
            }

            return true;

        } catch (error) {
            console.error('Error al eliminar el estudiante:', error);
        }

        return false;
    };
}



