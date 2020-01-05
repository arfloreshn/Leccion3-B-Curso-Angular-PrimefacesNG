import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paises } from '../modelo/paises';
  
const httOpciones = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

    apiUrl:String = "http://localhost:8088/cines/api/servicio.paises";
    
    constructor(private http:HttpClient) { }

    //Consume el metodo findAll() del backend para listar todos los registros
    ListarTodo() : Observable<any> {
      return this.http.get(this.apiUrl + "/");
    }

    //Consume el metodo post del backend para crear un nuevo registro
    crearPais(var_pais: Paises) : Observable<any> {
     
      const body = JSON.stringify(var_pais);
      return this.http.post(this.apiUrl + "/", body ,  httOpciones);
    
    }
  
    //Consume el metodo put del backend para modificar un registro
    modificarPais(var_pais: Paises) : Observable<any> {
      const body = JSON.stringify(var_pais);
      return this.http.put(this.apiUrl + "/"+ var_pais.paisid, body, httOpciones);
    }

    //Consume el metodo delete del backend para borrar un registro
    borrarPais(id: number) : Observable<any> {
      return this.http.delete(this.apiUrl + "/" + id);
    }

}
