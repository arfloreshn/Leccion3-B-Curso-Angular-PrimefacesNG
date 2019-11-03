import { formatDate } from '@angular/common';

export class Paises{

   constructor(
    public paisid:number, 
    public nomPais:string, 
    public idContinente: number, 
    public fecIndependencia:  Date, 
    public sn_monarquia: string )
 {
 }
}