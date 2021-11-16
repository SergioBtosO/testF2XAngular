import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Recaudo,ResponseAllRecaudo } from '../../../domain/recaudo.interface';
import { RecaudoUseCase } from 'src/app/recaudo/application/recaudo.usecase';
import { PaginatorData } from 'src/app/shared/classes/paginator-data';
import {
  ACTION_NEW,
  ACTION_EXPORT,
} from 'src/app/shared/components/keypad/keypad.component';
import { PaginatorComponent } from 'src/app/shared/components/paginator/paginator.component';
import { Roles } from 'src/app/shared/enums/roles.enum';
import { KeyPadButton } from 'src/app/shared/interfaces/keybutton.interface';
import { MetaDataColumn } from 'src/app/shared/services/meta-data-column';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { FormRecaudoComponent } from '../form-recaudo/form-recaudo.component';
import { DtoRecaudoExport } from 'src/app/recaudo/application/recaudo-export.dto';
@Component({
  selector: 'f2x-list-recaudo',
  templateUrl: './list-recaudo.component.html',
  styleUrls: ['./list-recaudo.component.css'],
})
export class ListRecaudoComponent extends PaginatorData implements OnInit {
  @ViewChild(PaginatorComponent) paginatorComponent:
    | PaginatorComponent
    | undefined;

  metaDataColumns: MetaDataColumn[] = [
    { field: 'fechaRecaudo', title: 'Fecha' },
    { field: 'estacion', title: 'Estacion' },
    { field: 'sentido', title: 'Sentido' },
    { field: 'categoria', title: 'Categoria' },
    { field: 'hora', title: 'Hora' },
    { field: 'valorTabulado', title: 'valor' },
  ];
  data: Recaudo[] = [];
  totalRecords = 0;

  tipoRoles: any = Roles;
  listKeyPadButtons: KeyPadButton[] = [
    {
      icon: 'add',
      color: 'primary',
      action: ACTION_NEW,
      tooltip: 'AGREGAR RECAUDO',
    },
    {
      icon: 'cloud_download',
      color: 'accent',
      action: ACTION_EXPORT,
      tooltip: 'EXPORTAR DATA',
    },
  ];

  constructor(
    private readonly utils: UtilsService,
    private readonly recaudoUseCase: RecaudoUseCase
  ) {
    super();
    this.list(1);
  }

  list(page: number) {
    this.recaudoUseCase
      .listByPage(page, environment.pageSize)
      .subscribe((response: ResponseAllRecaudo) => {
        this.dataByPage = response.data;
        this.totalRecords = 20;//response.data.length;
      });
  }

  delete(record: any) {
    const observableConfirm: Observable<string> = this.utils.confirm(
      `¿Quiere eliminar el recaudo ${record.nrecaudo}?`
    );
    observableConfirm.subscribe((response: string) => {
      if (!response) {
        return;
      }

      this.recaudoUseCase.delete(record).subscribe(() => {
        this.list(1);
      });
    });
  }

  openForm(evt: any, record: any = null) {
    evt?.stopPropagation();
    const options = {
      disableClose: true,
      panelClass: 'container-modal',
      data: record,
    };
    const reference: MatDialogRef<FormRecaudoComponent> = this.utils.openModal(
      FormRecaudoComponent,
      options
    );

    reference.afterClosed().subscribe((response) => {
      if (!response) {
        return;
      }

      if (response.id) {
        this.recaudoUseCase.update(response).subscribe((response: Recaudo) => {
          this.list(1);
        });
      } else {
        delete response.id;
        this.recaudoUseCase.insert(response).subscribe((response: Recaudo) => {
          this.list(1);
        });
      }
    });
  }

  openOptionsExport() {
    this.recaudoUseCase.listAll().subscribe((response: Recaudo[]) => {
      const dto = new DtoRecaudoExport();
      this.utils.openSheet(response, dto, 'Listado de recaudos', 'recaudos');
    });
  }

  actionButton(action: string) {
    switch (action) {
      case ACTION_NEW:
        this.openForm(null, null);
        break;
      case ACTION_EXPORT:
        this.openOptionsExport();
        break;
    }
  }
}
