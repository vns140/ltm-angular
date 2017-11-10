import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";


import 'rxjs/add/operator/do'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/switchMap'; 
import 'rxjs/add/operator/switchMap';
import { Usuario } from "./usuario";





@Injectable()
export class UsuarioService{
    constructor(private http: Http){
        
    }

    registrarUsuario(usuario: Usuario):Observable<Usuario>
    {
        let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        let response = this.http
        .post("http://localhost:49468/api/contas/registrar",headers,options)
        .map(this.extractData)
        .catch(this.serviceError);

        return response;
    }

    login(usuario: Usuario)
    {
        let headers = new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        });

        let options = new RequestOptions({ headers: headers });
 
        let client = "username=" + usuario.userName + "&password=" + encodeURIComponent(usuario.password) + "&grant_type=password&";
        
       
        let response = this.http.post('http://localhost:49468/api/token', client,options)
        .map(this.extractData)
        .catch(this.serviceError);
        

        return response;
    }



    private extractData(response: Response){
        let body = response.json();
        return body.data || {};
    }

    protected  serviceError(error: Response | any){
        let errMsg: string;
        if(error instanceof Response)
            {
                const body = error.json() || '';
                const err = body.err || JSON.stringify(body);
                errMsg = "Ocorreu um erro inesperado";
            }
            else{
                errMsg = error.message ? error.message : error.toString();
            }
            console.error(error);
                return Observable.throw(error);
    }
}
