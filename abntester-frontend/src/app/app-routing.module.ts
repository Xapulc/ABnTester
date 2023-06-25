import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TwoSampleFormComponent} from './two-sample-form/two-sample-form.component';
import {OneSampleFormComponent} from './one-sample-form/one-sample-form.component';

const routes: Routes = [
  {path: 'calculation/two-sample', component: TwoSampleFormComponent},
  {path: 'calculation/one-sample', component: OneSampleFormComponent},
  {path: '**', redirectTo: 'calculation/two-sample', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
