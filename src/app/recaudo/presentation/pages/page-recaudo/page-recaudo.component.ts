import { Component, OnInit } from '@angular/core';
import { ConfigLayout } from 'src/app/config/interfaces/config.interface';
import { ConfigService } from 'src/app/config/services/config.service';


@Component({
  selector: 'f2x-page-recaudo',
  templateUrl: './page-recaudo.component.html',
  styleUrls: ['./page-recaudo.component.css'],
})
export class PageRecaudoComponent implements OnInit {
  constructor(private readonly configService: ConfigService) {
  const config: ConfigLayout = {
    layout: {
      header: {
        hidden: false,
      },
      menu: {
        hidden: false,
      },
    },
  };
  this.configService.configuration = config;
}


  ngOnInit(): void {}
}
