import { Component, Input, Self } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() invalid: boolean = false;

  public value: string | undefined;
  public disabled: boolean = false;

  private onChange: (value: string) => void;
  private onTouched: () => void;

  constructor(
    @Self() private readonly ngControl: NgControl
  ) {
    this.ngControl.valueAccessor = this;
  }

  public onInputValueChange(event: any): void {
    this.onChange(event.target.value);
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}