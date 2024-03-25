import {Component, Input} from '@angular/core';
import {StandardCalculationContent} from './standard-calculation-result.model';
import {Clipboard} from "@angular/cdk/clipboard";
import {TuiAlertService} from "@taiga-ui/core";

@Component({
  selector: 'standard-calculation-result',
  templateUrl: './standard-calculation-result.component.html',
  styleUrls: ['./standard-calculation-result.component.less'],
})
export class StandardCalculationResultComponent {

  constructor(private clipboard: Clipboard,
              protected readonly alerts: TuiAlertService,) {
  }

  @Input({required: true}) content!: StandardCalculationContent

  copy(): void {
    const result = this.clipboard.copy(this.content.code)
    const status = result ? "success" : "error"
    const msg = result ? 'Код успешно скопирован в буфер обмена' : 'Скопировать не удалось'
    this.alerts.open(msg, {status: status}).subscribe()
  }

}
