import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { IMenu } from './menu.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private listMenu: IMenu[] = [
    { title: 'Usuarios', url: '/users', icon: 'usuario' },
    { title: 'Recaudo', url: '/recaudos', icon: 'recaudo' },
  ];

  constructor(private logService: LogService) {}

  getListMenu(): IMenu[] {
    this.logService.writeToLog('get list menu');
    return [...this.listMenu];
  }

  getDataPath(path: string): Partial<IMenu> {
    const elementMatched = this.listMenu.find(
      (el) => path.toLowerCase().indexOf(el.url.toLowerCase()) > -1
    );

    return {
      title: elementMatched?.title,
      icon: elementMatched?.icon,
    };
  }
}
