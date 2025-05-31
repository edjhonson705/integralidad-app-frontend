import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, Snackbar } from '@mui/material';
import { ControladorEstudiante } from '../controladores/estudiantes/ControladorEstudiante';
import type { Estudiante, MostrarAlerta } from '../modelos/estudiantes';

/**
 * 
 */
interface EstudianteCrearFormularioParametros {
  onCancelar?: () => void;
  estudianteModificar?: Estudiante;
}

/**
 *
 */
export default function EstudianteCrearFormulario(params: EstudianteCrearFormularioParametros) {

  const {
    onCancelar,
    estudianteModificar
  } = params;

  const [formData, setFormData] = React.useState<Estudiante>(estudianteModificar ? {
    anno_academico: estudianteModificar.anno_academico,
    grupo: estudianteModificar.grupo,
    primer_nombre: estudianteModificar.primer_nombre,
    segundo_nombre: estudianteModificar.segundo_nombre,
    primer_apellido: estudianteModificar.primer_apellido,
    segundo_apellido: estudianteModificar.segundo_apellido,
    via_ingreso: estudianteModificar.via_ingreso,
    situacion_escolar: estudianteModificar.situacion_escolar,
    observaciones: estudianteModificar.observaciones,
    sexo: estudianteModificar.sexo,
    id: estudianteModificar.id
  } : {
    anno_academico: '',
    grupo: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    via_ingreso: '',
    situacion_escolar: '',
    observaciones: '',
    sexo: '',
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
      ControladorEstudiante.modificarEstudiante(formData).then((resultado) => {

        if (resultado) {
          setMostrarAlerta({
            tipo: 'success',
            mostrar: true,
            mensaje: 'Los datos del estudiante han sido modificados satisfactoriamente'
          });
        }
        else {
          setMostrarAlerta({
            tipo: 'error',
            mostrar: true,
            mensaje: 'Ha ocurrido un error al modificar los datos del estudiante'
          });
        }

      }).catch((error) => {

        console.log('Ha ocurrido un error al modificar los datos del estudiant', error);

        setMostrarAlerta({
          tipo: 'error',
          mostrar: true,
          mensaje: 'Ha ocurrido un error al modificar los datos del estudiante'
        });
      });
    }
    else { //Crear estudiante
      ControladorEstudiante.crearEstudiante(formData).then((resultado) => {

        if (resultado) {
          setMostrarAlerta({
            tipo: 'success',
            mostrar: true,
            mensaje: 'Los datos del estudiante han sido guardados satisfactoriamente'
          });
        }
        else {
          setMostrarAlerta({
            tipo: 'error',
            mostrar: true,
            mensaje: 'Ha ocurrido un error al guardar los datos del estudiante'
          });
        }

      }).catch((error) => {

        console.error('Ha ocurrido un error al guardar los datos del estudiant', error);

        setMostrarAlerta({
          tipo: 'error',
          mostrar: true,
          mensaje: 'Ha ocurrido un error al guardar los datos del estudiante'
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
        sx={{ '& > :not(style)': { m: 1, width: '50ch' } }}
        noValidate
        autoComplete="off"
      >
        <TextField name='primer_nombre' value={formData.primer_nombre} onChange={handleChange} required id="outlined-basic" label="Primer nombre" variant="outlined" />
        <TextField name='segundo_nombre' value={formData.segundo_nombre} onChange={handleChange} id="outlined-basic" label="Segundo nombre" variant="outlined" />
        <TextField name='primer_apellido' value={formData.primer_apellido} onChange={handleChange} required id="outlined-basic" label="Primer apellido" variant="outlined" />
        <TextField name='segundo_apellido' value={formData.segundo_apellido} onChange={handleChange} required id="outlined-basic" label="Segundo apellido" variant="outlined" />
        <TextField name='anno_academico' value={formData.anno_academico} onChange={handleChange} required id="outlined-basic" label="Año académico" variant="outlined" />
        <TextField name='grupo' value={formData.grupo} onChange={handleChange} required id="outlined-basic" label="Grupo" variant="outlined" />
        <TextField name='via_ingreso' value={formData.via_ingreso} onChange={handleChange} required id="outlined-basic" label="Via de ingreso" variant="outlined" />
        <TextField name='situacion_escolar' value={formData.situacion_escolar} onChange={handleChange} required id="outlined-basic" label="Situación escolar" variant="outlined" />
        <TextField name='sexo' value={formData.sexo} onChange={handleChange} required id="outlined-basic" label="Sexo" variant="outlined" />

      </Box>

      <Box component="form"
        sx={{ '& > :not(style)': { m: 1, width: '102ch' } }}
        noValidate
        autoComplete="off">

        <TextField value={formData.observaciones} onChange={handleChange}
          name='observaciones'
          id="outlined-multiline-static"
          label="Observaciones"
          multiline
          rows={4}
        />
      </Box>

    </>
  );
}