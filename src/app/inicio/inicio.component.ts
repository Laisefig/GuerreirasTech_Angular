import { Component, OnInit } from "@angular/core"
import { environment } from "src/environments/environment.prod"
import { Categoria } from "../model/Categoria"
import { Postagem } from "../model/Postagem"
import { Usuario } from "../model/Usuario"
import { AuthService } from "../service/auth.service"
import { PostagemService } from "../service/postagem.service"
import { CategoriaService } from "../service/categoria.service"




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[] 
  tituloPost: string

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]
  idCategoria: number
  nomeCategoria: string

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  key = 'data'
  reverse = true

  constructor(
    private postagemService: PostagemService,
    private categoriaService: CategoriaService,
    private auth: AuthService
  ) { }


  ngOnInit() {
    window.scroll(0,0)

    

    this.auth.refreshToken()
    this.getAllCategorias()
    this.getAllPostagens()

    
  }

  getAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) =>{
      this.categoria = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUsuario(){
    this.auth.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  publicar(){
    this.categoria.id = this.idCategoria
    this.postagem.categoria = this.categoria

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }


  findByNomeCategoria(){
    if(this.nomeCategoria == ''){
      this.getAllCategorias()
    } else {
      this.categoriaService.getByNomeCategoria(this.nomeCategoria).subscribe((resp: Categoria[]) => {
        this.listaCategorias = resp
      })
    }
  }  
}




