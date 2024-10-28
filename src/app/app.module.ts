import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { name, version, as_web_component } from '../config';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { ModelComponent } from './components/model/model.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ModalDetailsComponent } from './components/modal-details/modal-details.component';

// Pipes to manage OPC data
import { NamePipe } from './pipes/name.pipe';
import { ClassPipe } from './pipes/class.pipe';
import { OpcnodePipe } from './pipes/opcnode.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    ModelComponent,
    ModalFormComponent,
    ModalDetailsComponent,
    NamePipe,
    ClassPipe,
    OpcnodePipe
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: as_web_component ? [] : [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    if (as_web_component) {
      const selector = `${name}_${version}`;
      const e1 = createCustomElement(AppComponent, { injector: this.injector });
      customElements.define(selector, e1);
    }
  }
}
