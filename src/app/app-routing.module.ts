import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletingPageComponent } from './pages/completing-page/completing-page.component';
import { HelloComponent } from './pages/hello/hello.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {path: '', component: HelloComponent},
  {path: 'main', component: MainComponent},
  {path: 'completing-page', component: CompletingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
