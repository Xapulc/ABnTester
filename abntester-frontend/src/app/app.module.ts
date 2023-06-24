import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
  TuiButtonModule, TuiErrorModule, TuiGroupModule,
  TuiHintModule,
  TuiModeModule,
  TuiRootModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TwoSampleFormComponent} from './two-sample-form/two-sample-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiRadioBlockModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TwoSampleFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiModeModule,
    TuiTabsModule,
    AppRoutingModule,
    TuiButtonModule,
    TuiInputModule,
    FormsModule,
    ReactiveFormsModule,
    TuiHintModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiGroupModule,
    TuiRadioBlockModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
