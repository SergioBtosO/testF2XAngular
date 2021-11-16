import { DtoExport } from 'src/app/shared/interfaces/dto-export.interface';
import { Recaudo } from '../domain/recaudo.interface';

export interface IDtoRecaudoExport {
 
  estacion: string;
  sentido: string;
  categoria: string;
  fechaRecaudo: Date;
  hora: number;
  valorTabulado: number;
}

export class DtoRecaudoExport implements DtoExport<Recaudo, IDtoRecaudoExport> {
  mapping(data: Recaudo[]): IDtoRecaudoExport[] {
    return data.map((el) => ({
      estacion: el.estacion,
      sentido: el.sentido,
      categoria: el.categoria,
      fechaRecaudo: el.fechaRecaudo,
      hora: el.hora,
      valorTabulado: el.valorTabulado
    }));
  }
}
