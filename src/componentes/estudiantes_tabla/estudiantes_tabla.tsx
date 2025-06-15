import React, { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import type { Estudiante, MostrarAlerta } from "../../modelos/estudiantes";
import { Alert, Button, Snackbar, Stack } from '@mui/material';
import { ControladorEstudiante } from '../../controladores/estudiantes/ControladorEstudiante';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import EstudiantesCrearDialogo from '../estudiantes_crear_dialogo';
import EstudianteParticipacionesCulturales from '../estudiantes_participaciones_culturales';
import EstudianteParticipacionesDeportivas from '../estudiantes_participaciones_deportivas';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  esES,
);

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'anno_academico', headerName: 'Año académico', width: 150 },
  { field: 'grupo', headerName: 'Grupo', width: 80 },
  { field: 'primer_nombre', headerName: 'Primer nombre', width: 140 },
  { field: 'segundo_nombre', headerName: 'Segundo nombre', width: 140 },
  { field: 'primer_apellido', headerName: 'Primer apellido', width: 140 },
  { field: 'segundo_apellido', headerName: 'Segundo apellido', width: 140 },
  { field: 'via_ingreso', headerName: 'Vía de ingreso', width: 150 },
  { field: 'situacion_escolar', headerName: 'Situación escolar', width: 150 },
  { field: 'sexo', headerName: 'Sexo', width: 50 },
  { field: 'observaciones', headerName: 'Observaciones', width: 150 },
];

const paginationModel = { page: 0, pageSize: 10 };

interface EstudiantesTablaParametros {
  listadoEstudiantes?: Estudiante[];
  onCrearEstudiante?: () => void;
  onModificarEstudiante?: (estudiante: Estudiante) => void;
  onEliminarEstudiante?: (resultado: boolean) => void;
}

/**
 * 
 * @returns 
 */
export default function EstudiantesTabla(params: EstudiantesTablaParametros) {

  /*const {
    onCrearEstudiante,
    onModificarEstudiante,
  } = params;*/

  const [estudianteAModificar, setEstudianteAModificar] = React.useState<Estudiante | null>(null);
  const [estudianteACulturales, setEstudianteACulturales] = React.useState<Estudiante | null>(null);
  const [estudianteADeportivas, setEstudianteADeportivas] = React.useState<Estudiante | null>(null);

  //useState
  const [seleccionado, setSeleccionado] = useState<string>('');

  const [creandoEstudiante, setCreandoEstudiante] = useState<boolean>(false);

  const [mostrarAlerta, setMostrarAlerta] = useState<MostrarAlerta>({
    tipo: 'success',
    mostrar: false,
    mensaje: ''
  });

  const [listadoEstudiantes, setListadoEstudiantes] = useState<Estudiante[]>([]);
  const [refrescarListado, setRefrescarListado] = useState(false);

  /**
   * Solicitar estudiantes a la API
   */
  const obtenerListadoEstudiantes = () => {

    ControladorEstudiante.obtenerListadoEstudiantes()
      .then((datos) => {
        setListadoEstudiantes(datos);
      }).catch((error) => {
        console.error('Error obteniendo estudiantes', error);
      });
  };

  // obtener listado de estudiantes en la primera carga del componente
  useEffect(() => {
    obtenerListadoEstudiantes();
  }, [refrescarListado]);

  /**
   * 
   */
  const onEliminar = () => {

    if (seleccionado !== '') {

      ControladorEstudiante.eliminarEstudiante(seleccionado).then((resultado) => {

        if (resultado) {
          setMostrarAlerta({
            tipo: 'success',
            mostrar: true,
            mensaje: 'Los datos del estudiante han sido eliminados satisfactoriamente'
          });

          // Recargar la lista de estudiantes
          obtenerListadoEstudiantes();

        }
        else {
          setMostrarAlerta({
            tipo: 'error',
            mostrar: true,
            mensaje: 'Ha ocurrido un error al eliminar los datos del estudiante'
          });
        }

      }).catch((error) => {
        console.log('Error al eliminar estudiante', error);

        setMostrarAlerta({
          tipo: 'error',
          mostrar: true,
          mensaje: 'Ha ocurrido un error al eliminar los datos del estudiante'
        });
      });
    }
  }

  /**
   * JSX
   */
  return (
    <Paper sx={{ height: 500, width: '100%' }}>
      <ThemeProvider theme={theme}>

        <Snackbar
          open={mostrarAlerta.mostrar}
          autoHideDuration={10000}
          onClose={() => setMostrarAlerta({ tipo: 'success', mostrar: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Puedes cambiar la posición
        >
          <Alert onClose={() => setMostrarAlerta({ tipo: 'success', mostrar: false })} severity={mostrarAlerta.tipo} variant="filled" sx={{ width: '100%' }}>
            {mostrarAlerta.mensaje}
          </Alert>
        </Snackbar>

        <Stack direction="row" spacing={2}>

          {/*Agregar*/}
          <Button variant='contained' onClick={() => {
            setCreandoEstudiante(true);
          }}>Agregar estudiante</Button>

          {/*Modificar*/}
          <Button variant="outlined" onClick={() => {
            const estudiante = listadoEstudiantes.find(est => est.id === Number(seleccionado));
            if (estudiante) {
              setEstudianteAModificar(estudiante);
            }
          }}>Modificar</Button>

          {/*Eliminar*/}
          <Button variant="outlined" color='error' onClick={() => {
            onEliminar();
          }}>Eliminar</Button>

          {/*Participaciones culturales*/}
          <Button variant="outlined" color='info' onClick={() => {
            const estudiante = listadoEstudiantes.find(est => est.id === Number(seleccionado));
            if (estudiante) {
              setEstudianteACulturales(estudiante);
            }
          }}>Participaciones culturales</Button>

          {/*Participaciones deportivas*/}
          <Button variant="outlined" color='info' onClick={() => {
            const estudiante = listadoEstudiantes.find(est => est.id === Number(seleccionado));
            if (estudiante) {
              setEstudianteADeportivas(estudiante);
            }
          }}>Participaciones deportivas</Button>

        </Stack>

        <DataGrid
          rows={listadoEstudiantes}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          disableMultipleRowSelection
          onRowSelectionModelChange={(ids) => {
            const arrayId = Array.from(ids.ids);
            setSeleccionado(arrayId[0] as string);
          }}
          sx={{ border: 0 }}
        />

        {/* Crear estudiante - Dialogo */}
        {creandoEstudiante || estudianteAModificar ? <EstudiantesCrearDialogo estudianteModificar={estudianteAModificar || null} onCancelar={() => {
          setCreandoEstudiante(false);
          setEstudianteAModificar(null);
        }} /> : null}

        {
          estudianteACulturales ?
            <EstudianteParticipacionesCulturales
              onCancelar={
                () => { setEstudianteACulturales(null); }
              }
              estudiante={estudianteACulturales}
            />
            : null
        }

        {
          estudianteADeportivas ?
            <EstudianteParticipacionesDeportivas
              onCancelar={
                () => { setEstudianteADeportivas(null); }
              }
              estudiante={estudianteADeportivas}
            />

            : null
        }

      </ThemeProvider>
    </Paper>
  );
}
