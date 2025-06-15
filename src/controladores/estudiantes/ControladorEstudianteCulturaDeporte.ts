import type { ParticipacionCultura } from "../../modelos/estudiantes";

/**
 * Controlador paa Gestionar datos de la entidad Estudiante
 */
export class ControladorEstudianteCulturaDeporte {

    /**
     * 
     * @returns 
     */
    static async obtenerParticipacionesCulturalesDelEstudiante(idEstudiante: number): Promise<ParticipacionCultura[]> {

        try {
            const response = await fetch(`http://localhost:3000/estudiante/${idEstudiante}/participaciones-culturales`);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            const data: ParticipacionCultura[] = await response.json();
            return data;

        } catch (error) {
            console.error('Error al obtener los estudiantes:', error);
        }
        return [];
    }

    /**
     * Enviar los datos del estudiante a crear a la API
     */
    static async asignarParticipacionCulturalEstudiante(idEstudiante: number, idParticipacionCultural: string): Promise<boolean> {

        try {
            const response = await fetch(`http://localhost:3000/estudiante/${idEstudiante}/participaciones-culturales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "participacionIds": [idParticipacionCultural]
                }),
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
     * Eliminar
     */
    static async eliminarParticipacionCulturalDelEstudiante(idEstudiante: number, idParticipacion: string): Promise<boolean> {

        try {
            const response = await fetch(`http://localhost:3000/estudiante/${idEstudiante}/participaciones-culturales`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "participacionId": idParticipacion
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar participación cultural');
            }
            return true;

        } catch (error) {
            console.error('Error al eliminar la participación cultural:', error);
        }
        return false;
    };
}



