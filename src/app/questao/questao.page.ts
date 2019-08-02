import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.page.html',
  styleUrls: ['./questao.page.scss'],
})
export class QuestaoPage implements OnInit {

  private questoes: any[];
  private questaoAtual = 0;
  private questaoViewList = [];
  public questaoView = { questao: "", alternativas: ["", "", "", ""], resposta: -1, correta: false};
  private loadView: HTMLIonLoadingElement;
  private disciplina;
  private service: Observable<any>;
  private subService;

  constructor(
    private navCtrl: NavController,
    private apiService: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.loadView = await this.loadingCtrl.create({
      message: "Carregando Simulado..."
    });
    await this.loadView.present();

    this.subService = this.route.queryParams.subscribe(params => {
      this.disciplina = params.disciplina;
      switch(params.disciplina) {
        case 'mecanica':
          this.service = this.apiService.getMecanicaQuestoes();
          break;
        case 'meteorologia':
          this.service = this.apiService.getMeteorologiaQuestoes();
          break;
        case 'navegacao':
          this.service = this.apiService.getNavegacaoQuestoes();
          break;
        case 'regulamentos':
          this.service = this.apiService.getRegulamentosQuestoes();
          break;
        case 'teoria-voo':
          this.service = this.apiService.getTeoriaVooQuestoes();
          break;
      }
      this.executeService();
    });

    this.route.queryParams.subscribe(params => {
      if (params.questId != undefined) {
        this.questaoAtual = params.questId;
        this.showQuestao();
      }
    })
  }

  executeService() {    
    this.service.subscribe((result: any[]) => {
      this.questoes = result;
      this.questoes.forEach(q => {
        let answers: any[] = q.wrong_answers.slice();
        answers.push(q.correct_answer);
        answers = this.shuffle(answers);

        this.questaoViewList.push({
          questao: q.question,
          alternativas: answers,
          resposta: -1,
          correta: false
        });
      });

      this.showQuestao();
      this.loadView.dismiss();
      this.subService.unsubscribe();
    });
  }

  showQuestao() {
    this.questaoView = this.questaoViewList[this.questaoAtual];
  }

  proximaQuestao() {
    this.questaoAtual += 1;
    this.showQuestao();
  }

  voltaQuestao() {
    this.questaoAtual -= 1;
    this.showQuestao();
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  respostaOnClick(resposta) {
    this.questaoView.resposta = resposta;
    this.questaoView.correta = this.questoes[this.questaoAtual].correct_answer == this.questaoView.alternativas[this.questaoView.resposta];
  }

  async finishOnClick() {
    const alert = await this.alertCtrl.create({
      header: 'Você tem certeza?',
      message: 'Você tem certeza de finalizar este simulado?',
      buttons: ['Não', {
        text: 'Sim',
        handler: () => {
          let total = 0;

          this.questaoViewList.forEach(q => {
            if (q.correta)
              total += 1;
          });
          
          let navOpts: NavigationOptions = {
            queryParams: {
              total: total,
              disciplina: this.disciplina
            }
          }

          this.navCtrl.navigateForward("resultado", navOpts);
        }
      }]
    });
    alert.present();
  }

  listaQuestaoOnClick() {
    let questoes = [];
    let questId = 0;
    this.questaoViewList.forEach(qv => {
      questoes.push({
        id: questId++,
        questao: qv.questao,
        respondida: qv.resposta != -1
      });
    });

    this.navCtrl.navigateForward('lista-questao', {
      queryParams: {
        questoes: questoes
      }
    });
  }
}
