import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://ppa-simulado-api.herokuapp.com/api/';
  apiKey = '';

  constructor(
    private http: HttpClient
  ) { }

  getMecanicaQuestoes() {
    return this.http.get(this.url + 'mecanica');
  }

  getMeteorologiaQuestoes() {
    return this.http.get(this.url + 'meteorologia');
  }

  getNavegacaoQuestoes() {
    return this.http.get(this.url + 'navegacao');
  }

  getRegulamentosQuestoes() {
    return this.http.get(this.url + 'regulamentos');
  }

  getTeoriaVooQuestoes() {
    return this.http.get(this.url + 'teoria-voo');
  }

}
