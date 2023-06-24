import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OneSampleFormComponent} from './one-sample-form/one-sample-form.component';
import {IsBinaryRadioComponent} from './parameters/is-binary-radio/is-binary-radio.component';
import {AlphaComponent} from './parameters/alpha/alpha.component';
import {BetaComponent} from './parameters/beta/beta.component';
import {MdeComponent} from './parameters/mde/mde.component';
import {
  OneTwoSidedAlternativeComponent,
} from './parameters/one-two-sided-alternative/one-two-sided-alternative.component';
import {ProbabilityComponent} from './parameters/probability/probability.component';
import {VarianceComponent} from './parameters/variance/variance.component';
import {GlobalHttpInterceptor} from './interceptor/global-http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TwoSampleFormComponent,
    OneSampleFormComponent,
    IsBinaryRadioComponent,
    AlphaComponent,
    BetaComponent,
    MdeComponent,
    OneTwoSidedAlternativeComponent,
    ProbabilityComponent,
    VarianceComponent,
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
    TuiAlertModule,
    HttpClientModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
