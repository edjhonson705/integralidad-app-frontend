
import { type AlertColor } from '@mui/material';

/**
 * Tipo para representar un estudiante
 */
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

/**
 * Tipo para representar la participación en actividades culturales
 */
export type ParticipacionCultura = {
    id?: number;
    nombre_numero_cultural: string;
    categoria_cultural: string;
    resultado: string;
    fecha: Date;  
    curso: string; 
};

/**
 * Interfaz para mostrar alertas
 */
export type ParticipacionDeportes = {
    id?: number;
    nombre_numero_deportivo: string;
    categoria_deportiva: string;
    resultado: string;   
};

/**
 * Interfaz para mostrar alertas
 */
export interface MostrarAlerta {
    tipo: AlertColor;
    mostrar: boolean;
    mensaje?:string;
  }