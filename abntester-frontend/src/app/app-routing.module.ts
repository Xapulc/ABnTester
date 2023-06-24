import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TwoSampleFormComponent} from './two-sample-form/two-sample-form.component';

const routes: Routes = [
  {'path': 'calculation/two-sample', component: TwoSampleFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
