import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';

// components Bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

// components shared
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';
import { MenuLoginComponent } from './shared/menu-login/menu-login.component';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';


// Services
import { UsuarioService } from './usuario/usuario.service';
import { ProdutoService } from './produtos/produto.service';
import { AuthService } from './shared/auth-service';




@NgModule({
  declarations: [
    AppComponent,
    MainPrincipalComponent,
    FooterComponent,
    MenuSuperiorComponent,
    HomeComponent,
    MenuLoginComponent,
    ListaProdutosComponent,
    InscricaoComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig,{useHash:  false})
  ],
  providers: [
    UsuarioService,
    AuthService,
    ProdutoService,
    Title

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
