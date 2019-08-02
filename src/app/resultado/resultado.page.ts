import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {

  public total = 0;
  private disciplina;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private route: ActivatedRoute,
    private storage: NativeStorage
  ) {
    platform.backButton.subscribe(this.goBack);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      
      this.total = params.total;
      this.disciplina = params.disciplina;
      this.registraDesempenho();
    });
  }

  registraDesempenho() {
    this.storage.keys().then(async (keys: any[]) => {
      let result = [0, 0];
      if (keys.indexOf(this.disciplina) > -1) {
        result = await this.storage.getItem(this.disciplina);
        console.log(result);
        
      }

      if (this.total >= 14) {
        result[0] += 1;
      } else {
        result[1] += 1;
      }

      console.log(this.disciplina, result);
      
      this.storage.setItem(this.disciplina, result);
    })
  }

  newOnClick() {
    this.navCtrl.navigateBack("disciplina");
  }

  goBack() {
    this.navCtrl.navigateBack("");
  }

  

}
