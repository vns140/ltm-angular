import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProdutoService } from "../produto.service";
import { Produto } from "../produto";

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListaProdutosComponent implements OnInit {

  public produtos: Produto[];
  public errorMessage:string="";

   constructor(public produtoService: ProdutoService) { 

  }

  ngOnInit() {
    this.produtoService.obterTodos()
    .subscribe(
      produtos => this.produtos = produtos,
      error => this.errorMessage
    );
  }

}
