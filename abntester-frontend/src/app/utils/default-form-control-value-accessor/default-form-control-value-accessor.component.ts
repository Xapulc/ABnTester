import {AbstractControl, ControlValueAccessor, FormControl, ValidationErrors, Validator} from '@angular/forms';
import {Component, Input} from '@angular/core';

@Component({template: ''})
export abstract class DefaultFormControlValueAccessorComponent implements ControlValueAccessor, Validator {

  abstract form: FormControl
  openHint = false
  @Input() hintContent: string = ''

  onChange = (_: number | null) => {
  };
  onTouched = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable()
    } else {
      this.form.enable()
    }
  }

  writeValue(obj: any): void {
    this.form.setValue(obj, {emitEvent: false})
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => this.onChange(value))
  }

  showHint() {
    this.openHint = true
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.errors;
  }
}
