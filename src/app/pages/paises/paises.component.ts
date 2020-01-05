import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

// Importa los componentes o controles de primeNG
import { MenuItem, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';



// Importa la clase de modelo de pais
import { Paises } from 'src/app/modelo/paises';

// Importa la clase de modelo de contienentes
import { Continentes } from 'src/app/modelo/continentes';

// Importa la clase de servicios de paises
import { PaisesService } from 'src/app/services/paises.service';


@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  /*-*-*-*-*-*-*-*-*-*-*-*- VARIABLES DE DIALOGOS *-*-*-*-*-**-*-*-*-*-*-*-*-*-
           EN ESTA SECCION SE DECLARAN TODOS LOS ARREGLOS QUE VAMOS A CONSUMIR
  *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

  frmCrear: boolean = false;
  frmEditar: boolean = false;
  frmBorrar: boolean = false;

  ////////////////////////// VARIABLES DE ARRREGLOS ///////////////////////////////////
  //         EN ESTA SECCION SE DECLARAN TODOS LOS ARREGLOS QUE VAMOS A CONSUMIR
  ////////////////////////////////////////////////////////////////////////////////////

  // Arreglo de fecha para inicializar las fechas del calendario en espaniol*/
  es: any;

  // Arreglo de contienes para incializar los items de los combos seleccion*/
  continentes: SelectItem[];

  // Arreglo de paises para trabajar con el llenado de datos de tabla del front-end o COMPONENTE HTML 
  paises: Paises[];

  //Arreglo para definir las columna de la tabla en el front-end o COMPONENTE HTML 
  cols: any[];


  ///////////////////////////// VARIABLES DE TIPOS  ///////////////////////////////////

  /*
  Tipo: entidad.
  Esta variable tipo entidad, abstrae o copia las propiedades de la clase modelo 
  de pais, este tipo se usara para crear nuevos registros 
  */

  entidad: Paises =
    {
      paisid: null,
      nomPais: null,
      idContinente: null,
      fecIndependencia: new Date(Date.now()),
      sn_monarquia: 'N'
    };


  /*
   Tipo: seleccionarPais.
   Esta es una variable de abstraccio de las propiedades de la clase modelo de pais
   este tipo se usara para llenar y mostrar el detalle de los registros una vez seleccionados 
   */

  seleccionarPais: Paises =
    {
      paisid: null,
      nomPais: "",
      idContinente: null,
      fecIndependencia: null,
      sn_monarquia: null
    };

    /*
   Tipo: seleccionarContinente.
   Esta es una variable de abstraccio de las propiedades de la clase modelo de Continentes
   este tipo se usara para llenar y mostrar en un combo de los datos de los continentes 
   */

  seleccionarContinente: Continentes;


  /////////////////////////  INSTANCIACION O INICIALIZACION DEL CONSTRUCTOR  ///////////////////////////////////

  constructor(private paisesService: PaisesService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService) {


      
    interface Continentes {
      id: number;
      nomContinente: string;
    }


    //SelectItem API with label-value pairs
    this.continentes = [
      { label: 'Seleccione un continente', value: null },
      { label: 'Asia', value: 1 },
      { label: 'America', value: 2 },
      { label: 'Africa', value: 3 },
      { label: 'Antartida', value: 4 },
      { label: 'Oceania', value: 5 }
    ];
  }

  /////////////////////////   INCIALIZACION O PRE-RENDERIZADO DE VARIABLES  ///////////////////////////////////

  ngOnInit() {

    //var now = this.datePipe.transform(new Date(),"dd/MM/yyyy HH:mm:ss");
    // console.log(now);

 
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    };

    //Los campos del arreglo para las columnas, se deben llamar exactamente igual nombre del modelo de la clase pais
    this.cols = [
      {field: "paisid", header: "ID"}
      ,{ field: "nomPais", header: "PAIS"}
    ];


    // Lista todos los registros de la tabla pais
    this.ListarTodo();

  }

  seleccionPaisBoton(obj: Paises, cmd: String) {
    this.seleccionarPais = obj;

    if (cmd == 'U') {
      this.frmEditar = true;
    }
    else {
      if (cmd == 'D') {
        this.frmBorrar = true;
      }

    }
  }


  // llamada para mostrar el dialogo de Crear nuevo Registro
  viewNuevoRegistro() {
    this.frmCrear = true;
  }

  //llamada para mostrar el dialogo de Modificar el Registro
  viewEditaRegistro() {
    // Validamos de que se haya seleccionado un registro al menos
    if (this.seleccionarPais != null && this.seleccionarPais.nomPais.length > 5) {
      this.frmEditar = true;
    }
    else {
      this.messageService.add({ severity: 'warn', summary: 'Selecion', detail: 'Seleccione un registro' });
      return
    }

  }

  //llamada para mostrar el dialogo de Borrar el Registro
  viewBorraRegistro() {

    if (this.seleccionarPais != null && this.seleccionarPais.nomPais.length > 5) {
      this.frmBorrar = true;
    }
    else {
      this.messageService.add({ severity: 'warn', summary: 'Selecion', detail: 'Seleccione un registro' });
      return
    }

  }



  // Listamos todos los registros
  ListarTodo() {

    // Consumimos el servicio que muestra todos los registro 
    this.paisesService.ListarTodo().subscribe(
      (result: any) => {

        //Let var_paises es una variable de tipo local que solo funciona dentro la funcion ListarTodo() 
        let var_paises: Paises[] = [];
        for (let i = 0; i < result.length; i++) {

          //Covertimos a una cadena de texto
          let var_cadena_json = JSON.stringify(result[i]);

          //console.log(cadena);

          let var_yy = parseInt(var_cadena_json.substr(21,4),10);
          let var_mm = parseInt(var_cadena_json.substr(26,2),10);
          let var_dd = parseInt(var_cadena_json.substr(29,2),10);
          let var_hh = +var_cadena_json.substr(30,2);


          let var_cadena_fecha1 =   "'" + var_yy + "/"+ var_mm + "/" + var_dd + "'" ;
         
          //var datePipe = new DatePipe("es-HN");
          //let var_cadena_fecha2 = datePipe.transform(var_cadena_fecha1, 'dd/MM/yyyy');
          
          console.log(var_cadena_fecha1);

          //new Date(year, month, day, hours, minutes, seconds, milliseconds)

          var var_nueva_fecha = new Date(var_cadena_fecha1);
          //var var_nueva_fecha = new Date(var_yy,  var_mm-1, var_dd, 0,0,0,0);

          let puntero = result[i] as Paises
         
          //Reasigno el nuevo valor de la fecha
          //Esto est correcto porque asi no tiene definido 
          puntero.fecIndependencia = new Date(var_yy,  var_mm-1, var_dd); //Svar_nueva_fecha;
          var_paises.push(puntero);
        }

        
        this.paises = var_paises;
        
        //console.log(result);
      },
      //muestro el error en la consola de nuestro navegador en caso de que ocurra alguna error
      error => {
        // console.log(error);
        this.messageService.add({ severity: 'warn', summary: 'Fallo de solicitud!', detail: 'Acción cancelada' + error });
      }
    )
  }



  /* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
      ESTE PROCEDIMIENTO ES PARA CREAR UN NUEVO REGISTRO 
  -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

  cmdcrearnuevoregistro() {


    //Consumimos el servicio para crear nuevos registros 
    this.paisesService.crearPais(this.entidad).subscribe(
      (result: any) => {
        //console.log(result);
        let var_pais = result as Paises;
        this.paises.push(var_pais);
        this.ListarTodo();
        
        //
        this.messageService.add({ severity: 'success', summary: 'Procesado', detail: 'Registro guardado, existosamente' });
        this.frmCrear = false;
      },
      //muestro el error en la consola de nuestro navegador en caso de que ocurra alguna error
      error => {
        //console.log(error); 
        this.messageService.add({ severity: 'warn', summary: 'Fallo de solicitud!', detail: 'Acción cancelada' + error });
      }
    )


  }


  /* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
       ESTE PROCEDIMIENTO ES PARA MODIFICAR UN REGISTRO 
   -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

  cmdmodificarregistro() {


    //Consumimos el servicio para modificar registros
    this.paisesService.modificarPais(this.seleccionarPais).subscribe(
      (result: any) => {
        //console.log(result);
        let var_pais = result as Paises;

        this.paises.push(var_pais);
        this.ListarTodo();
        this.messageService.add({ severity: 'success', summary: 'Editado', detail: 'Edición existosa!' });
        this.frmEditar = false;
      },
      //muestrar el error en la consola de nuestro navegador en caso de que ocurra alguna error
      error => {
        //console.log(error); 
        this.messageService.add({ severity: 'warn', summary: 'Fallo de solicitud!', detail: 'Acción cancelada' });
      }
    )

  }


  /* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
       ESTE PROCEDIMIENTO ES PARA BORRAR UN REGISTRO 
   -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/

  cmdborraregistro() {

    // Validamos de que se haya seleccionado un registro al menos
    if (this.seleccionarPais == null && this.seleccionarPais.paisid == null) {
      this.messageService.add({ severity: 'warn', summary: 'Selecion', detail: 'Seleccione un registro' });
      return
    }

    // Hacemos la pregunta de confirmación del borrar
    this.confirmationService.confirm({
      message: 'Esta seguro que desea proceder?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        // Comsumimos el servicio de borrar registros, depues habeer confirmado la eliminacion del registro
        this.paisesService.borrarPais(this.seleccionarPais.paisid).subscribe(
          (result: any) => {

            //console.log(result);
            let var_pais = result as Paises;

            this.paises.push(var_pais);
            this.ListarTodo();
            this.messageService.add({ severity: 'success', summary: 'Eliminar', detail: 'Eliminación, existosa!' });
            this.frmBorrar = false;
          },
          //muestrar el error en la consola de nuestro navegador en caso de que ocurra alguna error
          error => {
            //console.log(error); 
            this.messageService.add({ severity: 'warn', summary: 'Fallo de solicitud!', detail: 'Accíon cancelada' + error });
          }
        )
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Acción confirmada' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'Acción cancelada' });
      }
    });
  }


}
