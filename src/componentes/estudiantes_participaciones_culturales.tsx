import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ControladorEstudianteCulturaDeporte } from '../controladores/estudiantes/ControladorEstudianteCulturaDeporte';
import type { Estudiante, ParticipacionCultura } from '../modelos/estudiantes';
import { FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { ControladorCultura } from '../controladores/cultura/ControladorCultura';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nombre_numero_cultural', headerName: 'Número cultural', width: 220 },
    { field: 'categoria_cultural', headerName: 'Categoria cultural', width: 150 },
    { field: 'resultado', headerName: 'Resultado', width: 100 },
    { field: 'fecha', headerName: 'Fecha', width: 120, },
    { field: 'curso', headerName: 'Curso', width: 140 },
];

const paginationModel = { page: 0, pageSize: 10 };

/**
 *  Interfaz de Parametros para el formulario de creación de estudiantes.
 */
interface IPCmpEstudianteParticipacionesCulturales {
    onCancelar?: () => void;   
    estudiante?: Estudiante | null;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

/**
 *  Un formulario de diálogo que permite al usuario ingresar su dirección de correo electrónico.
 * @returns 
 */
export default function EstudianteParticipacionesCulturales(params: IPCmpEstudianteParticipacionesCulturales) {

    const { onCancelar, estudiante } = params;
    const [open, setOpen] = React.useState(true);
    const [listado, setListado] = React.useState<ParticipacionCultura[]>([]);
    const [seleccionado, setSeleccionado] = React.useState<string>('');
    const [refrescarListado, setRefrescarListado] = React.useState(false);
    const [agregandoParticipacion, setAgregandoParticipacion] = React.useState(false);
    const [participaciones, setParticipaciones] = React.useState<ParticipacionCultura[]>([]);

    /**
     * Solicitar estudiantes a la API
     */
    const obtenerListado = () => {

        if (estudiante?.id) {
            ControladorEstudianteCulturaDeporte.obtenerParticipacionesCulturalesDelEstudiante(estudiante.id)
                .then((datos) => {
                    setListado(datos);
                }).catch((error) => {
                    console.error('Error obteniendo estudiantes', error);
                });
        }
    };

    // obtener listado de estudiantes en la primera carga del componente
    React.useEffect(() => {
        obtenerListado();
    }, [refrescarListado]);

    /**
     * 
     */
    const onEliminarClick = () => {

        if (estudiante?.id) {
            ControladorEstudianteCulturaDeporte.eliminarParticipacionCulturalDelEstudiante(estudiante?.id, seleccionado).then((resultado) => {

                if (resultado) {
                    setRefrescarListado(!refrescarListado);
                }
            })
        }
    }
  
    const [personName, setPersonName] = React.useState<string>('');

    const onAgregarParticipacion = () => {

        ControladorCultura.obtenerListado().then((listadoParticipacionesCulturales) => {

            console.log(listadoParticipacionesCulturales);
            setParticipaciones(listadoParticipacionesCulturales);
        });

        setAgregandoParticipacion(true);
    }

    /**
     * JSX
     */
    return (
        <React.Fragment>

            <Dialog
                fullWidth={true}
                maxWidth='md'
                open={open}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                        },
                    },
                }}
            >
                <DialogTitle>Participaciones culturales del estudiante</DialogTitle>

                <DialogContent>
                    <Paper sx={{ justifyContent: 'flex-end', height: 300, width: '100%' }}>
                        <Typography><strong>Nombre: </strong>
                            {estudiante?.primer_nombre + ' ' + estudiante?.segundo_nombre + ' ' + estudiante?.primer_apellido + ' ' + estudiante?.segundo_apellido}
                        </Typography>
                        <Typography><strong>Sexo: </strong>
                            {estudiante?.sexo === 'm' ? 'Masculino' : 'Femenino'}
                        </Typography>
                        <Typography><strong>Grupo: </strong>
                            {estudiante?.grupo}
                        </Typography>

                        {/* Botones Agregar y Eliminar*/}
                        <Stack direction="row" spacing={2}>

                            {/*Agregar*/}
                            <Button variant='contained' onClick={onAgregarParticipacion}>Agregar participación</Button>

                            {/*Eliminar*/}
                            <Button variant="outlined" color='error' onClick={onEliminarClick}>Eliminar</Button>

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

                    </Paper>

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => { if (onCancelar) onCancelar(); setOpen(false); }}>Cerrar</Button>

                </DialogActions>

            </Dialog>

            {/*Agregar participacion*/}
            <Dialog fullWidth={true} maxWidth='sm' open={agregandoParticipacion} >
                <DialogTitle>Agregar participación</DialogTitle>

                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="demo-multiple-name-label">Participaciones culturales</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={personName}
                            onChange={(event) => {
                                setPersonName(event.target.value);
                            }}
                            MenuProps={MenuProps}
                        >
                            {participaciones.map((participacion) => (
                                <MenuItem
                                    key={participacion.id}
                                    value={participacion.id}
                                /* style={getStyles(participacion.nombre_numero_cultural, personName, theme)}*/
                                >
                                    {participacion.id + ' - '+ participacion.nombre_numero_cultural + ' - ' + participacion.curso + ' - ' + participacion.resultado}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </DialogContent>

                <DialogActions>

                    <Button variant="outlined" color='info'
                        onClick={() => {
                            setAgregandoParticipacion(false);
                        }}>Cancelar</Button>

                    <Button variant='contained' onClick={() => {

                        if (estudiante?.id) {

                            console.log(personName);

                            ControladorEstudianteCulturaDeporte.asignarParticipacionCulturalEstudiante(estudiante?.id, personName).then((resultado) => {

                                if(resultado){
                                    //TODO: mostrar mensaje notificacion
                                    setRefrescarListado(!refrescarListado);
                                }
                                else{
                                    //TODO
                                }
                            });
                            setAgregandoParticipacion(false);
                        }

                    }}>Guardar</Button>

                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}
