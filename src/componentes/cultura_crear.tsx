import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, Snackbar } from '@mui/material';
import { ControladorCultura as Controlador } from '../controladores/cultura/ControladorCultura';
import type { MostrarAlerta, ParticipacionCultura } from '../modelos/estudiantes';

/**
 *  Parámetros para el formulario de creación de estudiante.
 */
interface CulturaCrearFormularioParametros {
  onCancelar?: () => void;
  itemModificar?: ParticipacionCultura;
}

/**
 * Componente para crear o modificar un estudiante.
 */
export default function CulturaCrearFormulario(params: CulturaCrearFormularioParametros) {

  const {
    onCancelar,
    itemModificar
  } = params;

  const [formData, setFormData] = React.useState<ParticipacionCultura>(itemModificar ? {
    nombre_numero_cultural: itemModificar.nombre_numero_cultural,
    categoria_cultural: itemModificar.categoria_cultural,
    resultado: itemModificar.resultado,
    fecha: itemModificar.fecha,
    curso: itemModificar.curso,
    id: itemModificar.id
  } : {
    nombre_numero_cultural: '',
    categoria_cultural: '',
    resultado: '',
    fecha: new Date(),
    curso: '',
  });

  const [mostrarAlerta, setMostrarAlerta] = React.useState<MostrarAlerta>({
    tipo: 'success',
    mostrar: false,
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   *  Función para guardar los datos del estudiante.
   */
  const onGuardar = () => {

    if (formData.id) { //Modificar estudiante

      Controlador.modificar(formData).then((resultado) => {

        if (resultado) {
          setMostrarAlerta({
            tipo: 'success',
            mostrar: true,
            mensaje: 'Los datos de la participación han sido modificados satisfactoriamente'
          });
        }
        else {
          setMostrarAlerta({
            tipo: 'error',
            mostrar: true,
            mensaje: 'Ha ocurrido un error al modificar los datos de la participación'
          });
        }

      }).catch((error) => {

        console.log('Ha ocurrido un error al modificar los datos de la participación', error);

        setMostrarAlerta({
          tipo: 'error',
          mostrar: true,
          mensaje: 'Ha ocurrido un error al modificar los datos de la participación'
        });
      });
    }
    else { //Crear
      Controlador.crear(formData).then((resultado) => {

        if (resultado) {
          setMostrarAlerta({
            tipo: 'success',
            mostrar: true,
            mensaje: 'Los datos de la participación han sido guardados satisfactoriamente'
          });
        }
        else {
          setMostrarAlerta({
            tipo: 'error',
            mostrar: true,
            mensaje: 'Ha ocurrido un error al guardar los datos de la participación'
          });
        }

      }).catch((error) => {

        console.log('Ha ocurrido un error al guardar los datos de la participación', error);

        setMostrarAlerta({
          tipo: 'error',
          mostrar: true,
          mensaje: 'Ha ocurrido un error al guardar los datos de la participación'
        });
      });
    }

  }

  /**
   * JSX
   */
  return (
    <>
      {/* Contenedor para alinear los botones a la derecha */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
        <Button variant="outlined" onClick={() => { if (onCancelar) onCancelar(); }}>Cancelar</Button>
        <Button variant="contained" onClick={() => {
          onGuardar();
        }}>Guardar</Button>
      </Box>

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

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' },
          display: 'flex',
          flexDirection: 'column',
          gap: 2, // espacio entre campos
          width: '50ch'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField name='nombre_numero_cultural' value={formData.nombre_numero_cultural}
          onChange={handleChange} required id="outlined-basic" label="Número cultural" variant="outlined" />
        <TextField name='categoria_cultural' value={formData.categoria_cultural} onChange={handleChange} id="outlined-basic" label="Categoría cultural" variant="outlined" />
        <TextField name='resultado' value={formData.resultado} onChange={handleChange} required id="outlined-basic" label="Resultado" variant="outlined" />

      </Box>
    </>
  );
}