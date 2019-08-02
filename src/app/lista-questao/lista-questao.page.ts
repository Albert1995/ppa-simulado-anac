import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-questao',
  templateUrl: './lista-questao.page.html',
  styleUrls: ['./lista-questao.page.scss'],
})
export class ListaQuestaoPage implements OnInit {

  public questoes;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.questoes = params.questoes;
    });
  }

  questOnClick(id) {
    this.navCtrl.navigateBack('questao', {
      queryParams: {
        questId: id
      }
    })
  }

}
