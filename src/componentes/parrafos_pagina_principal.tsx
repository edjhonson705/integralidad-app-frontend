import * as React from 'react';
import Typography from '@mui/material/Typography';

/**
 * 
 */
export default function ParrafosPaginaPrincipal() {

    /**
     * JSX
     */
    return (
        <>
            <Typography sx={{ marginBottom: 2 }}>
                La Universidad de las Ciencias Informáticas (UCI), también conocida
                como la UCI, es un centro universitario de investigación cubano ubicado
                en el barrio de Wajay, municipio de Boyeros, La Habana. La universidad se crea como un proyecto de la Revolución Cubana denominado
                como “Proyecto Futuro” que tiene dos objetivos: informatizar el país y desarrollar
                la industria del software informático para contribuir al desarrollo económico del mismo.
                Es la primera universidad cubana que se establece bajo los propósitos de la denominada
                Batalla de Ideas que estaba ocurriendo en el 2002.
            </Typography>

            <Typography sx={{ marginBottom: 2 }}>
                La UCI tiene un currículo muy particular entre las otras universidades del país.
                Ya que los estudiantes siguen el principio de vincular el trabajo y el estudio
                a su desarrollo educativo, lo que garantiza un énfasis en la producción como
                parte del proceso de aprendizaje. A partir del segundo o tercer año de la
                carrera los estudiantes pueden vincularse a proyectos productivos que aportan
                ya directamente a la economía digital.

                La universidad ofrece los siguientes cursos:

                - Ingeniería en Ciencias Informáticas
                - Ingeniería en Bioinformática
                - Ingeniería en Ciberseguridad

                Otras actividades que complementan el currículo de formación para dar espacio
                a la investigación e innovación y al desarrollo de habilidades en el uso de la
                tecnología. La UCI cuenta con una tecnología informática avanzada y es uno de
                los principales centros de investigación y de desarrollo de software en Cuba.
                Los estudiantes han desarrollado programas y videojuegos para varias
                plataformas como Picta, Coliseum y Nova droid.
            </Typography>
        </>
    );
}
