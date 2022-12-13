import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseFileForTemplateComponent } from './pages/choose-file-for-template/choose-file-for-template.component';
import { CompletingPageComponent } from './pages/completing-page/completing-page.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { HelloComponent } from './pages/hello/hello.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {path: '', component: HelloComponent},
  {path: 'main', component: MainComponent},
  {path: 'completing-page', component: CompletingPageComponent},
  {path: 'chooseFileForTemplate', component: ChooseFileForTemplateComponent},
  {path: 'createTemplate', component: CreateTemplateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
