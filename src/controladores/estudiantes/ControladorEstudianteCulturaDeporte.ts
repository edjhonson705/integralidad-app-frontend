import type { ParticipacionCultura } from "../../modelos/estudiantes";

/**
 * Controlador paa Gestionar datos de la entidad Estudiante
 */
export class ControladorEstudianteCulturaDeporte {

    // CULTURA

    /**
     * obtenerParticipacionesCulturalesDelEstudiante
     * @param idEstudiante 
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
     * Asignar una participacion cultural a un estudiante
     * @param idEstudiante 
     * @param idParticipacionCultural 
     * @returns 
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
     * eliminarParticipacionCulturalDelEstudiante
     * 
     * Eliminar una participacion cultural de un estudiante
     * 
     * @param idEstudiante 
     * @param idParticipacion 
     * @returns 
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

    //DEPORTES 

    /**
    * obtenerParticipacionesDeportivasDelEstudiante
    * @param idEstudiante 
    * @returns 
    */
    static async obtenerParticipacionesDeportivasDelEstudiante(idEstudiante: number): Promise<ParticipacionCultura[]> {

        try {
            const response = await fetch(`http://localhost:3000/estudiante/${idEstudiante}/participaciones-deportivas`);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            const data: ParticipacionCultura[] = await response.json();
            return data;

        } catch (error) {
            console.error('Error al obtener las participaciones deportivas:', error);
        }
        return [];
    }

    /**
     * Asignar una participacion cultural a un estudiante
     * @param idEstudiante 
     * @param idParticipacionCultural 
     * @returns 
     */
    static async asignarParticipacionDeportivaEstudiante(idEstudiante: number, idParticipacionCultural: string): Promise<boolean> {

        try {
            const response = await fetch(`http://localhost:3000/estudiante/${idEstudiante}/participaciones-deportivas`, {
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
                throw new Error(errorData.message || 'Error al guardar el la participaciondeportiva del estudiante');
            }
            return true;

        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
        return false;
    };

    /**
     * eliminarParticipacionCulturalDelEstudiante
     * 
     * Eliminar una participacion cultural de un estudiante
     * 
     * @param idEstudiante 
     * @param idParticipacion 
     * @returns 
     */
    static async eliminarParticipacionDeportivaDelEstudiante(idEstudiante: number, idParticipacion: string): Promise<boolean> {

        try {
            const response = await fetch(`http://localhost:3000/estudiante/${idEstudiante}/participaciones-deportivas`, {
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
                throw new Error(errorData.message || 'Error al eliminar participación deportiva');
            }
            return true;

        } catch (error) {
            console.error('Error al eliminar la participación deportiva:', error);
        }
        return false;
    };
}



