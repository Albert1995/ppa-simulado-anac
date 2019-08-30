import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {

  constructor(private adMobFree:AdMobFree) {
    this.showAdBanner();
  }

  showAdBanner() {
    console.log("olha eu aqui...")
    var adMobConfig: AdMobFreeBannerConfig = {
      id: 'ca-app-pub-1372926585403280/6925949974',
      isTesting: false,
      autoShow: true
     };

     this.adMobFree.banner.config(adMobConfig);
     this.adMobFree.banner.prepare()
      .then(() => {
        console.log("heyyy");
        
      })
      .catch(e => console.log(e));
  }

}
