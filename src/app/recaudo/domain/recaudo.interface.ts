export interface Recaudo {
  id: string;
  estacion: string;
  sentido: string;
  categoria: string;
  fechaRecaudo: Date;
  hora: number;
  valorTabulado: number;
 
}

export interface ResponseAllRecaudo {
  
    pageNumber: number;
    pageSize: number;
    succeeded: boolean;
    message: string | null;
    errors: string [] | null;
    data: Recaudo[];
}
