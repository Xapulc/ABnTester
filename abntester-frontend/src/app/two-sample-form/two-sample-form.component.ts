import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-two-sample-form',
  templateUrl: './two-sample-form.component.html',
  styleUrls: ['./two-sample-form.component.css'],
})
export class TwoSampleFormComponent implements OnInit {

  form: FormGroup = new FormGroup({
    alpha: new FormControl(5, Validators.required),
    beta: new FormControl(5, Validators.required),
    mde: new FormControl(5, Validators.required),
    probability: new FormControl(5, Validators.required),
    firstSampleProportion: new FormControl(50, Validators.required),
    secondSampleProportion: new FormControl(50, Validators.required),
    alternative: new FormControl('ONE_SIDED', Validators.required),
  });

  ngOnInit(): void {
    this.form.get('firstSampleProportion')?.valueChanges.subscribe(
      value => {
        if (value != null) {
          this.form.get('secondSampleProportion')?.setValue(100 - value)
        }
      })
  }

}
