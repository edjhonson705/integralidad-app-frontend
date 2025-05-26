
import { type AlertColor } from '@mui/material';

export type Estudiante = {
    id?: number;
    anno_academico: string;
    grupo: string;
    primer_apellido: string;
    segundo_apellido: string;
    primer_nombre: string;
    segundo_nombre: string;
    via_ingreso: string;
    situacion_escolar: string;
    observaciones: string;   
    sexo: string;    
};

export interface MostrarAlerta {
    tipo: AlertColor;
    mostrar: boolean;
    mensaje?:string;
  }