import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Usuario } from "../usuario";
import { UsuarioService } from "../usuario.service";

import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { GenericValidator } from "../../../utils/generic-form-validator";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";


@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
  styleUrls: ['./inscricao.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InscricaoComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElement: ElementRef[];

  public errors: any[] = [];
  public inscricaoForm: FormGroup;
  public usuario: Usuario;

  constructor(private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService) {

    this.validationMessages =
      {
        userName: {
          required: 'O Usuário é requerido.',
          minLength: 'O Usuário precisa ter no mínimo 2 caracteres.',
          maxLength: 'O Usuário precisa ter no máximo 20 caracteres.'
        }
        ,
        password: {
          required: 'Informe a senha.',
          minLength: 'A senha deve possuir no mínimo 6 caracteres.'
        }
        ,
        confirmPassword: {
          required: 'Informe a senha novamente.',
          minLength: 'A senha deve possuir no mínimo 6 caracteres.',
          equalTo: 'As senhas não conferem'
        }
      };

    this.genericValidor = new GenericValidator(this.validationMessages);
    this.usuario = new Usuario();


  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidor: GenericValidator;

  ngOnInit() {

    let password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(password)])
    this.inscricaoForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.max(20)]],
      password: password,
      confirmPassword: confirmPassword
    });
  }

  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElement
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.inscricaoForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidor.processMessages(this.inscricaoForm);
    });

  }

  adicionarUsuario() {
    if (this.inscricaoForm.dirty && this.inscricaoForm.valid) {
      let p = Object.assign({}, this.usuario, this.inscricaoForm.value);

      this.usuarioService.registrarUsuario(p)
        .subscribe(
        result => { this.onSaveComplete(result) },
        error => {
          this.errors = JSON.parse(error._body).errors;
        });


    }
  }

  onSaveComplete(response: any): void {
      this.inscricaoForm.reset();
      this.errors= [];
  }

  ngOnDestroy():void{

  }
}