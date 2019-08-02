import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'disciplina', loadChildren: './disciplina/disciplina.module#DisciplinaPageModule' },
  { path: 'questao', loadChildren: './questao/questao.module#QuestaoPageModule' },
  { path: 'lista-questao', loadChildren: './lista-questao/lista-questao.module#ListaQuestaoPageModule' },
  { path: 'resultado', loadChildren: './resultado/resultado.module#ResultadoPageModule' },
  { path: 'estatistica', loadChildren: './estatistica/estatistica.module#EstatisticaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
