import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HelloComponent } from './pages/hello/hello.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { CompletingPageComponent } from './pages/completing-page/completing-page.component';
import { FileFormComponentComponent } from './components/file-form-component/file-form-component.component';
import { ChooseFileForTemplateComponent } from './pages/choose-file-for-template/choose-file-for-template.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    HelloComponent,
    CompletingPageComponent,
    FileFormComponentComponent,
    ChooseFileForTemplateComponent,
    CreateTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
