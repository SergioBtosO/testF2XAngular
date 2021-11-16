import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecaudoRepository } from '../application/recaudo.repository';
import { Recaudo,ResponseAllRecaudo } from '../domain/recaudo.interface';

@Injectable()
export class RecaudoOperation extends RecaudoRepository {
  constructor(private readonly http: HttpClient) {
    super();
  }

  listAll(): Observable<Recaudo[]> {
    return this.http.get<Recaudo[]>(`${environment.pathAPIRest}/v1/Recaudos`);
  }

  insert(recaudo: Recaudo): Observable<Recaudo> {
    return this.http.post<Recaudo>(
      `${environment.pathAPIRest}/v1/Recaudos`,
      recaudo
    );
  }

  listByPage(
    pageNumber: number,
    pageSize: number
  ): Observable<ResponseAllRecaudo> {

    let params = new HttpParams();
    params = params.set('PageNumber', pageNumber.toString());
    params = params.set('PageSize', pageSize.toString());

    return  this.http.get<ResponseAllRecaudo>(
      `${environment.pathAPIRest}/v1/Recaudos`,{params:params});
  }

  delete(recaudo: Recaudo): Observable<Recaudo> {
    return this.http.delete<Recaudo>(
      `${environment.pathAPIRest}/v1/Recaudos/${recaudo.id}`
    );
  }
  update(recaudo: Recaudo): Observable<Recaudo> {
    const dataToSent: any = Object.assign({}, recaudo);
    delete dataToSent.id;

    return this.http.put<Recaudo>(
      `${environment.pathAPIRest}/v1/Recaudos/${recaudo.id}`,
      dataToSent
    );
  }
}
