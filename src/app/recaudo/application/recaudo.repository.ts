import { Observable } from 'rxjs';
import { Recaudo,ResponseAllRecaudo } from '../domain/recaudo.interface';

export abstract class RecaudoRepository {
  abstract listAll(): Observable<Recaudo[]>;
  abstract insert(recaudo: Recaudo): Observable<Recaudo>;
  abstract listByPage(
    pageNumber: number,
    pageSize: number
  ): Observable<ResponseAllRecaudo>;
  abstract delete(recaudo: Recaudo): Observable<Recaudo>;
  abstract update(recaudo: Recaudo): Observable<Recaudo>;
}
