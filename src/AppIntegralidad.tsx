import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import EstudiantesTabla from './componentes/estudiantes_tabla/estudiantes_tabla';
//import type { Estudiante } from './modelos/estudiantes';
import ParrafosPaginaPrincipal from './componentes/parrafos_pagina_principal';
import CulturaTabla from './componentes/cultura_tabla/cultura_tabla';
import DeportesTabla from './componentes/deportes_tabla/deportes_tabla';
//import CulturaCrearFormulario from './componentes/cultura_crear';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

/**
 *  AppBar
 */
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

/**
 *  DrawerHeader
 */
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


interface IPCAppIntegralidad {
    onSalir: (params: any) => void;
}


/**
 * AppIntegralidad
 *  - Componentes de la interfaz principal de la aplicacion.
 * @returns 
 */
export default function AppIntegralidad(params: IPCAppIntegralidad) {

    const { onSalir } = params;

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [queHacer, setQueHacer] = React.useState<{
        paginaPrincipal: boolean;
        gestionandoEstudiantes: boolean;
        gestionarCultura: boolean;
        gestionarDeportes: boolean;
    }>({
        paginaPrincipal: true,
        gestionandoEstudiantes: false,
        gestionarCultura: false,
        gestionarDeportes: false
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    /**
     * JSX
     */
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            { mr: 2, },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Gestión de Integralidad Facultad de Informática Organizacional (FIO)
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <img
                        src="./public/logo-uci.png"
                        alt="Logo"
                        style={{ height: 40, marginRight: 'auto' }}
                    />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>

                    <ListItem key={'Estudiantes'} disablePadding>
                        <ListItemButton onClick={() => {
                            setQueHacer({
                                paginaPrincipal: false,
                                gestionandoEstudiantes: true,
                                gestionarCultura: false,
                                gestionarDeportes: false
                            });
                        }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Estudiantes'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={'Cultura'} disablePadding>
                        <ListItemButton onClick={() => {
                            setQueHacer({
                                paginaPrincipal: false,
                                gestionandoEstudiantes: false,
                                gestionarCultura: true,
                                gestionarDeportes: false
                            });

                        }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Cultura'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={'Deportes'} disablePadding>
                        <ListItemButton onClick={() => {
                            setQueHacer({
                                paginaPrincipal: false,
                                gestionandoEstudiantes: false,
                                gestionarCultura: false,
                                gestionarDeportes: true
                            });
                            //setGestionandoDeportes(true);
                        }}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Deportes'} />
                        </ListItemButton>
                    </ListItem>

                </List>
                <Divider />
                <List>
                    <ListItem key={'Salir'} disablePadding>
                        <ListItemButton onClick={onSalir}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>

            {/*Contenido principal*/}
            <Main open={open}>
                <DrawerHeader />

                {/* Texto de inicio*/}
                {queHacer.paginaPrincipal ? <ParrafosPaginaPrincipal /> : null}

                {/* Gestionando Estudiantes */}
                {queHacer.gestionandoEstudiantes ? <EstudiantesTabla /> : null}

                {/* Gestionando Cultura */}
                {queHacer.gestionarCultura ? <CulturaTabla /> : null}

                {/* Gestionando Deportes */}
                {queHacer.gestionarDeportes ? <DeportesTabla /> : null}

            </Main>
        </Box>
    );
}
