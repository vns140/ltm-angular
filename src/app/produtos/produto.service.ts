import {Injectable} from '@angular/core';
import { ServiceBase } from "../shared/service-base";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Produto } from "./produto";



@Injectable()

export class ProdutoService extends ServiceBase
{
    constructor(private http: Http) {
        super();
      
    }

    obterTodos(): Observable<Produto[]>
    {        
        return this.http.get(this.UrlService+"produtos",this.obterAuthHeader)
        .map((res: Response)=> <Produto[]>res.json())
        .catch(super.serviceError);
    }
}