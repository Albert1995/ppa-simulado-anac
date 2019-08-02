import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-estatistica',
  templateUrl: './estatistica.page.html',
  styleUrls: ['./estatistica.page.scss'],
})
export class EstatisticaPage implements OnInit {

  public mecanicaResultado = [0, 0];
  public meteorologiaResultado = [0, 0];
  public navegacaoResultado = [0, 0];
  public regulamentosResultado = [0, 0];
  public teoriaResultado = [0, 0];

  private keys = ['mecanica', 'meteorologia', 'navegacao', 'regulamentos', 'teoria-voo']

  constructor(
    private storage: NativeStorage
  ) { }

  ngOnInit() {
    this.storage.keys().then((keys: any[]) => {      
      this.keys.forEach(async k => {        
        if (keys.indexOf(k) > -1) {          
          switch(k) {
            case 'mecanica':
              this.mecanicaResultado = await this.storage.getItem(k);
              break;
            case 'meteorologia':
              this.meteorologiaResultado = await this.storage.getItem(k);
              break;
            case 'navegacao':
              this.navegacaoResultado = await this.storage.getItem(k);
              break;
              case 'regulamentos':
              this.regulamentosResultado = await this.storage.getItem(k);
              break;
            case 'teoria-voo':
              this.teoriaResultado = await this.storage.getItem(k);
              break;
          }
        } else {
          await this.storage.setItem(k, [0, 0]);
        }
      })
    });

  }

}
