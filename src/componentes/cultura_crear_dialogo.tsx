import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { MostrarAlerta, ParticipacionCultura } from '../modelos/estudiantes';
import { Alert, Box, Snackbar } from '@mui/material';
import { ControladorCultura as Controlador } from '../controladores/cultura/ControladorCultura';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

/**
 *  Parámetros para el formulario de creación de estudiante.
 */
interface IPCmpCulturaCrearDialogo {
    onCancelar?: () => void;
    onGuardarOK?: () => void;
    itemModificar?: ParticipacionCultura | null;
}

/**
 *  Un formulario de diálogo que permite al usuario ingresar su dirección de correo electrónico.
 * @returns 
 */
export default function CulturaCrearDialogo(params: IPCmpCulturaCrearDialogo) {

    const {
        onCancelar,
        itemModificar,
        onGuardarOK
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

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

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

                    if (onGuardarOK)
                        onGuardarOK();
                }
                else {
                    setMostrarAlerta({
                        tipo: 'error',
                        mostrar: true,
                        mensaje: 'Ha ocurrido un error al modificar los datos de la participación'
                    });
                }

            }).catch((error) => {

                console.error('Ha ocurrido un error al modificar los datos de la participación', error);

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

                    if (onGuardarOK)
                        onGuardarOK();
                }
                else {
                    setMostrarAlerta({
                        tipo: 'error',
                        mostrar: true,
                        mensaje: 'Ha ocurrido un error al guardar los datos de la participación'
                    });
                }

            }).catch((error) => {

                console.error('Ha ocurrido un error al guardar los datos de la participación', error);

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
        <React.Fragment>

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

            <Dialog
                fullWidth={false}
                maxWidth='xs'
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                           // const formData = new FormData(event.currentTarget);
                           // const formJson = Object.fromEntries((formData as any).entries());
                            //const email = formJson.email;                      
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Adicionar participación cultural</DialogTitle>

                <DialogContent>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '40ch' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField name='nombre_numero_cultural'
                            value={formData.nombre_numero_cultural}
                            onChange={handleChange}
                            required id="outlined-basic"
                            label="Número cultural"
                            variant="outlined" />
                            
                        <TextField name='categoria_cultural'
                            value={formData.categoria_cultural}
                            onChange={handleChange} id="outlined-basic"
                            label="Categoría cultural"
                            variant="outlined" />

                        <TextField name='resultado'
                            value={formData.resultado}
                            onChange={handleChange}
                            required id="outlined-basic"
                            label="Resultado"
                            variant="outlined" />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label='Fecha'
                                onChange={(newValue) => {
                                    if (newValue) {
                                        setFormData({ ...formData, fecha: newValue.toDate() }); // convertir dayjs a Date
                                    }
                                }}
                                value={dayjs(formData.fecha)} />
                        </LocalizationProvider>

                        <TextField name='curso' value={formData.curso} onChange={handleChange} required id="outlined-basic" label="Curso" variant="outlined" />
                    </Box>

                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={() => { if (onCancelar) onCancelar(); }}>Cancelar</Button>
                    <Button variant="contained" onClick={() => {
                        onGuardar();
                    }}>Guardar</Button>
                </DialogActions>

            </Dialog>
        </React.Fragment>
    );
}
