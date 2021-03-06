import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './share/breadcrumbs/breadcrumbs.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PaisesComponent } from './pages/paises/paises.component';
import { SidebarComponent } from './share/sidebar/sidebar.component';
import { HeaderComponent } from './share/header/header.component';


import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';





import {APP_BASE_HREF} from '@angular/common';


import { registerLocaleData } from '@angular/common';

    // importar locales
    import localeEsHN from '@angular/common/locales/es-HN';

    // registrar los locales con el nombre que quieras utilizar a la hora de proveer
    registerLocaleData(localeEsHN, 'es-HN');

  
@NgModule({
  declarations: [AppComponent,
    PaisesComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    PanelModule,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    InputTextModule,
    RadioButtonModule,
    CalendarModule,
    DropdownModule,
    ConfirmDialogModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/leccion3b'},
     {provide: LOCALE_ID, useValue: "es-HN" },
    MessageService,DatePipe,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
