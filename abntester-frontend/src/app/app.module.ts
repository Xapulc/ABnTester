import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,
  TuiLabelModule,
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
import {TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE} from '@taiga-ui/i18n';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OneSampleFormComponent} from './one-sample-form/one-sample-form.component';
import {IsBinaryRadioComponent} from './parameters/is-binary-radio/is-binary-radio.component';
import {AlphaComponent} from './parameters/alpha/alpha.component';
import {BetaComponent} from './parameters/beta/beta.component';
import {MdePercentComponent} from './parameters/mde-percent/mde-percent.component';
import {
  OneTwoSidedAlternativeComponent,
} from './parameters/one-two-sided-alternative/one-two-sided-alternative.component';
import {ProbabilityComponent} from './parameters/probability/probability.component';
import {VarianceComponent} from './parameters/variance/variance.component';
import {GlobalHttpInterceptor} from './interceptor/global-http-interceptor';
import {of} from 'rxjs';
import {MdeAbsComponent} from './parameters/mde-abs/mde-abs.component';

@NgModule({
  declarations: [
    AppComponent,
    TwoSampleFormComponent,
    OneSampleFormComponent,
    IsBinaryRadioComponent,
    AlphaComponent,
    BetaComponent,
    MdePercentComponent,
    OneTwoSidedAlternativeComponent,
    ProbabilityComponent,
    VarianceComponent,
    MdeAbsComponent,
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
    TuiLabelModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true},
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
