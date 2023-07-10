import {Component, Input} from '@angular/core';
import {StandardCalculationContent} from './standard-calculation-result.model';

@Component({
  selector: 'standard-calculation-result',
  templateUrl: './standard-calculation-result.component.html',
  styleUrls: ['./standard-calculation-result.component.less'],
})
export class StandardCalculationResultComponent {

  @Input({required: true}) content!: StandardCalculationContent

}
