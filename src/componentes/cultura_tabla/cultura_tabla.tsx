import React, { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import type { ParticipacionCultura, MostrarAlerta } from "../../modelos/estudiantes";
import { Alert, Button, Snackbar, Stack } from '@mui/material';
import { ControladorCultura as Controlador } from '../../controladores/cultura/ControladorCultura';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

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
  { field: 'nombre_numero_cultural', headerName: 'Número cultural', width: 300 },
  { field: 'categoria_cultural', headerName: 'Categoria cultural', width: 150 },
  { field: 'resultado', headerName: 'Resultado', width: 140 },
];
const paginationModel = { page: 0, pageSize: 10 };

interface CuturaTablaParametros {
  listado?: ParticipacionCultura[];
  onCrear?: () => void;
  onModificar?: (participacion:ParticipacionCultura) => void;
  onEliminar?: (resultado: boolean) => void;
}

/**
 * Componente para mostrar una tabla de estudiantes con opciones de agregar, modificar
 * y eliminar.
 * @returns 
 */
export default function CulturaTabla(params: CuturaTablaParametros) {

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

  const [listadoEstudiantes, setListadoEstudiantes] = useState<ParticipacionCultura[]>([]);

  /**
   * Solicitar estudiantes a la API
   */
  const obtenerListadoEstudiantes = () => {

    Controlador.obtenerListado()
      .then((datos) => {
        setListadoEstudiantes(datos);
      }).catch((error) => {
        console.error('Error obteniendo estudiantes', error);
      });
  };

  // obtener listado de estudiantes en la primera carga del componente
  useEffect(() => {
    obtenerListadoEstudiantes();
  }, []);

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
          obtenerListadoEstudiantes();

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

            if (onCrear) onCrear();

          }}>Agregar</Button>

          {/*Modificar*/}
          <Button variant="outlined" onClick={() => {

            const elSeleccionado = listadoEstudiantes.find(est => est.id === Number(seleccionado));

            if(elSeleccionado){
              if (onModificar) onModificar(elSeleccionado);
            }      

          }}>Modificar</Button>

          {/*Eliminar*/}
          <Button variant="outlined" color='error' onClick={() => {
            onEliminar();
          }}>Eliminar</Button>
        </Stack>

        <DataGrid
          rows={listadoEstudiantes}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20, 50]}
          checkboxSelection
          disableMultipleRowSelection
          onRowSelectionModelChange={(ids) => {

            console.log(ids);

            const arrayId = Array.from(ids.ids);
            // console.log(arrayId[0] as string);
            setSeleccionado(arrayId[0] as string);
          }}
          sx={{ border: 0 }}
        />
      </ThemeProvider>
    </Paper>
  );
}
