import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import type { ParticipacionCultura, MostrarAlerta, ParticipacionDeportes } from "../../modelos/estudiantes";
import { Alert, Button, Snackbar, Stack } from '@mui/material';
import { ControladorDeportes as Controlador } from '../../controladores/deportes/ControladorDeportes';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import DeportesCrearDialogo from '../deportes_crear_dialogo';

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
  { field: 'nombre_numero_deportivo', headerName: 'Deporte', width: 300 },
  { field: 'categoria_deportiva', headerName: 'Categoria deportiva', width: 150 },
  { field: 'resultado', headerName: 'Resultado', width: 140 },
  { field: 'fecha', headerName: 'Fecha', width: 140 },
  { field: 'curso', headerName: 'Curso', width: 140 },
];
const paginationModel = { page: 0, pageSize: 10 };

interface DeportesTablaParametros {
  listado?: ParticipacionCultura[];
  onCrear?: () => void;
  onModificar?: (participacion: ParticipacionDeportes) => void;
  onEliminar?: (resultado: boolean) => void;
}

/**
 * Componente para mostrar una tabla de estudiantes con opciones de agregar, modificar
 * y eliminar.
 * @returns 
 */
export default function DeportesTabla(params: DeportesTablaParametros) {

  const {
    onCrear,
    onModificar,
  } = params;

  //useState
  const [seleccionado, setSeleccionado] = useState<string>('');

  const [mostrarAlerta, setMostrarAlerta] = useState<MostrarAlerta>({
    tipo: 'success',
    mostrar: false,
    mensaje: ''
  });

  const [creandoParticipacionDeportiva, setCreandoParticipacionDeportiva] = useState<boolean>(false);
  const [participacionDeportivaAModificar, setParticipacionDeportivaAModificar] = useState<ParticipacionDeportes | null>(null);
  const [listado, setListado] = useState<ParticipacionDeportes[]>([]);
  const [refrescarListado, setRefrescarListado] = useState(false);

  //const [listadoEstudiantes, setListadoEstudiantes] = useState<ParticipacionDeportes[]>([]);

  /**
   * Solicitar estudiantes a la API
   */
  const obtenerListado = () => {

    Controlador.obtenerListado()
      .then((datos) => {
        setListado(datos);
      }).catch((error) => {
        console.error('Error obteniendo estudiantes', error);
      });
  };

  // obtener listado de estudiantes en la primera carga del componente
  useEffect(() => {
    obtenerListado();
  }, [refrescarListado]);

  /**
   * 
   */
  const onEliminar = () => {

    if (seleccionado !== '') {

      Controlador.eliminar(seleccionado).then((resultado) => {

        if (resultado) {
          setMostrarAlerta({
            tipo: 'success',
            mostrar: true,
            mensaje: 'Los datos de la participación han sido eliminados satisfactoriamente'
          });

          // Recargar la lista de estudiantes
          obtenerListado();

        }
        else {
          setMostrarAlerta({
            tipo: 'error',
            mostrar: true,
            mensaje: 'Ha ocurrido un error al eliminar los datos de la participación'
          });
        }

      }).catch((error) => {
        console.log('Error al eliminar la participación', error);

        setMostrarAlerta({
          tipo: 'error',
          mostrar: true,
          mensaje: 'Ha ocurrido un error al eliminar los datos la participación'
        });
      });
    }
  }

  /**
  * 
  */
  const onCancelarDeportesCrearDialogo = () => {
    setCreandoParticipacionDeportiva(false);
    setParticipacionDeportivaAModificar(null);
  }

  /**
  * 
  */
  const onAgregar = () => {
    setCreandoParticipacionDeportiva(true);
    if (onCrear) onCrear();
  }

  /**
 * 
 */
  const onModificarClick = () => {
    const elSeleccionado = listado.find(est => est.id === Number(seleccionado));
    if (elSeleccionado) {
      setParticipacionDeportivaAModificar(elSeleccionado);
      if (onModificar) onModificar(elSeleccionado);
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
          <Button variant='contained' onClick={onAgregar}>Agregar participación deportiva</Button>

          {/*Modificar*/}
          <Button variant="outlined" onClick={onModificarClick}>Modificar</Button>

          {/*Eliminar*/}
          <Button variant="outlined" color='error' onClick={() => {
            onEliminar();
          }}>Eliminar</Button>
        </Stack>

        <DataGrid
          rows={listado}
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

        {/* Crear participacion deportiva - Dialogo */}
        {
          creandoParticipacionDeportiva || participacionDeportivaAModificar
            ? <DeportesCrearDialogo
              itemModificar={participacionDeportivaAModificar || null}
              onCancelar={onCancelarDeportesCrearDialogo}
              onGuardarOK={() => {
                setRefrescarListado(!refrescarListado);
                setCreandoParticipacionDeportiva(false);
                setParticipacionDeportivaAModificar(null);
              }} /> : null
        }

      </ThemeProvider>
    </Paper>
  );
}
