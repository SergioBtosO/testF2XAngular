import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recaudo,ResponseAllRecaudo } from '../domain/recaudo.interface';
import { RecaudoRepository } from './recaudo.repository';

@Injectable()
export class RecaudoUseCase {
  constructor(private readonly recaudoRepository: RecaudoRepository) {}

  listAll(): Observable<Recaudo[]> {
    return this.recaudoRepository.listAll();
  }

  insert(recaudo: Recaudo): Observable<Recaudo> {
    return this.recaudoRepository.insert(recaudo);
  }

  listByPage(
    page: number,
    pageSize: number
  ): Observable<ResponseAllRecaudo> {
    return this.recaudoRepository.listByPage(page, pageSize);
  }

  delete(recaudo: Recaudo): Observable<Recaudo> {
    return this.recaudoRepository.delete(recaudo);
  }

  update(recaudo: Recaudo): Observable<Recaudo> {
    return this.recaudoRepository.update(recaudo);
  }
}
