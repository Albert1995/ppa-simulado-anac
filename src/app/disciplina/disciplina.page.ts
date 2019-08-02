import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.page.html',
  styleUrls: ['./disciplina.page.scss'],
})
export class DisciplinaPage implements OnInit {

  public disciplinas = [
    { label: "Conhecimentos Técnicos", value: "mecanica" },
    { label: "Meteorologia", value: "meteorologia" },
    { label: "Navegação", value: "navegacao" },
    { label: "Regulamentos", value: "regulamentos" },
    { label: "Teoria de Vôo", value: "teoria-voo" },
  ];

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  selectSubject(d) {
    this.navCtrl.navigateForward("questao", {
      queryParams: {
        disciplina: d
      }
    });
  }

}
