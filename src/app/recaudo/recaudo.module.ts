import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecaudoRoutingModule } from './recaudo-routing.module';
import { PageRecaudoComponent } from './presentation/pages/page-recaudo/page-recaudo.component';
import { ListRecaudoComponent } from './presentation/views/list-recaudo/list-recaudo.component';
import { SharedModule } from '../shared/shared.module';
import { RecaudoRepository } from './application/recaudo.repository';
import { RecaudoUseCase } from './application/recaudo.usecase';
import { RecaudoOperation } from './infraestructure/recaudo.operation';
import { FormRecaudoComponent } from './presentation/views/form-recaudo/form-recaudo.component';

@NgModule({
  declarations: [
    PageRecaudoComponent,
    ListRecaudoComponent,
    FormRecaudoComponent,
  ],
  imports: [CommonModule, RecaudoRoutingModule, SharedModule],
  exports: [PageRecaudoComponent],
  providers: [
    { provide: RecaudoRepository, useClass: RecaudoOperation },
    RecaudoUseCase,
  ],
})
export class RecaudoModule {}
