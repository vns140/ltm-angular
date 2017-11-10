import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";


import 'rxjs/add/operator/do'; 
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/switchMap'; 
import 'rxjs/add/observable/throw';

import {Usuario} from "../usuario/usuario";


export abstract class  ServiceBase {
    public Token: string ="";

    constructor() {

        this.Token = localStorage.getItem("token");
    }

    protected UrlService: string ="http://localhost:49468/api/";

    protected obterAuthHeader(): RequestOptions
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization',`Bearer ${this.Token}`);
        let options = new RequestOptions({headers: headers});
        return options;
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