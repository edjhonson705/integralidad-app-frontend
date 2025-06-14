import { useState } from 'react';

import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Alert,
    Snackbar
} from '@mui/material';
import CryptoJS from 'crypto-js';

interface IPCLoginForm {
    onAutenticar: (params: any) => void;
}

/**
 * Formulario de autenticacion
 * @param params 
 * @returns 
 */
const LoginForm = (params: IPCLoginForm) => {

    const { onAutenticar } = params;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fallo, setFallo] = useState(false);

    /**
     * Accion para el boton Enrar
     */
    const onEntrar = () => {
        // encriptar la contrasenna escrita por el usuario
        const contrasennaEncriptada = CryptoJS.MD5(password).toString();

        if (username == 'administrador' && contrasennaEncriptada == '89bfeb993a0454e84b469b3444e874ca') {
            sessionStorage.setItem('usuario', username);
            onAutenticar({
                username: username
            });
        }
        else {
            setFallo(true);
        }
    }

    /**
     * JSX
     */
    return (
        <>
            <Box
                sx={{
                    height: '90vh',
                    width: '90vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                }}
            >

                <Snackbar
                    open={fallo}
                    autoHideDuration={10000}
                    onClose={() => setFallo(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Puedes cambiar la posición
                >
                    <Alert variant="filled" severity="error">
                        Usuario o contraseña incorrectos.
                    </Alert>
                </Snackbar>

                <Paper elevation={3} sx={{ padding: 4, width: 350 }}>

                    <Typography variant="h5" align="center" gutterBottom>
                        Gestión de Integralidad
                    </Typography>

                    <Typography sx={{ fontSize: '15px'}} align="center" gutterBottom>
                        Facultad de Informática Organizacional
                    </Typography>

                    <Box component="form" onSubmit={() => { }} noValidate>
                        <TextField
                            label="Usuario"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button
                            onClick={onEntrar}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            Entrar
                        </Button>

                    </Box>
                    <Typography sx={{ fontSize: '12px', mt: 4 }} align="center" gutterBottom>
                        UCI &#169; 2025
                    </Typography>
                </Paper>
            </Box>
        </>
    );
};

export default LoginForm;
