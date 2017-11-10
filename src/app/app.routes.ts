import {Routes} from '@angular/router';


import {HomeComponent} from './home/home.component';
import {ListaProdutosComponent} from './produtos/lista-produtos/lista-produtos.component';
import { InscricaoComponent } from "./usuario/inscricao/inscricao.component";
import { LoginComponent } from "./usuario/login/login.component";
import { AuthService } from "./shared/auth-service";


export const rootRouterConfig : Routes = [

    {path:'', redirectTo: 'home',pathMatch:'full' },
    {path:'home', component: HomeComponent},
    {path:'produtos', canActivate:[AuthService], component: ListaProdutosComponent},
    {path:'inscricao', component: InscricaoComponent},
    {path:'entrar', component: LoginComponent},
]