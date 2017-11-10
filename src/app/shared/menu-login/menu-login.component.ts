import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MenuLoginComponent implements OnInit {
  public token;
  public user;
  public nome: string ="";

  constructor(private router: Router) {
    
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));

   }

    usuarioLogado(): boolean{
     return this.token !== null;
   }

    logout()
   {
     localStorage.removeItem('token');
     localStorage.removeItem('experies');
     localStorage.removeItem('user');
     this.router.navigate(['/entrar']);
   }

  ngOnInit() {

    if(this.user)
      this.nome = this.user.userName;
  }

}
