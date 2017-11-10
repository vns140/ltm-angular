import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { Router } from "@angular/router";
import { GenericValidator } from "../../../utils/generic-form-validator";
import { CustomValidators, CustomFormsModule } from 'ng2-validation';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { Usuario } from "../usuario";
import { UsuarioService } from "../usuario.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, AfterViewInit {




  @ViewChildren(FormControlName, { read: ElementRef }) formInputElement: ElementRef[];
  public errors: any[] = [];
  public loginForm: FormGroup;
  public usuario: Usuario;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidor: GenericValidator;



  constructor(private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService) {

    this.validationMessages =
      {
        userName: {
          required: 'Informe o Usuário.',
          email: 'Usuário invalido.',
        }
        ,
        password: {
          required: 'Informe a senha.',
          minLength: 'A senha deve possuir no mínimo 6 caracteres.'
        }
      };
    this.genericValidor = new GenericValidator(this.validationMessages);
    this.usuario = new Usuario();

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.max(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElement
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.loginForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidor.processMessages(this.loginForm);
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      let p = Object.assign({}, this.usuario, this.loginForm.value);

      this.usuarioService.login(p)
        .subscribe(
        result => { this.onSaveComplete(result) },
        error => {
          this.errors = JSON.parse(error._body).errors;
        });
    }

     
  }

   onSaveComplete(response: any): void {
      this.loginForm.reset();
      this.errors= [];

      localStorage.setItem('token',response.access_token);
      localStorage.setItem('expires',response.expires_in);

      this.router.navigate(['/produtos']);

  }

  ngOnDestroy():void{

  }
}
