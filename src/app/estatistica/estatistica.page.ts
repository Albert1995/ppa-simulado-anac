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
            case keys[0]:
              this.mecanicaResultado = await this.storage.getItem(k);
              break;
            case keys[1]:
              this.meteorologiaResultado = await this.storage.getItem(k);
              break;
            case keys[2]:
              this.navegacaoResultado = await this.storage.getItem(k);
              break;
            case keys[3]:
              this.regulamentosResultado = await this.storage.getItem(k);
              break;
            case keys[4]:
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
