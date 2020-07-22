import { Component, OnInit, Input } from '@angular/core';
import { FormGroup , FormControl, FormArray, FormBuilder, Validators} from '@angular/forms';
import { FormData } from './../interface/form-data';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() formData: FormData[];
  optionCForm: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  formGroup = {};
  constructor(private fb: FormBuilder) { }

  /* ngOnInit() {
    const formGroup = {};
    if (this.formData.length > 0) {
    console.log(this.formData);
    this.formData.forEach(formControl => {
       formGroup[formControl.controlName] = new FormControl('');
       console.log(formControl);
    });
     this.form = new FormGroup(formGroup);
    }

  } */

  ngOnInit(): void {
   // console.log(this.formData);
    this.touchedRows = [];
    this.optionCForm = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.formData.forEach(formControl => {
       this.formGroup[formControl.controlName] = new FormControl('');
   });
   // console.log(this.formGroup);
   this.addRow();
  }

  initiateForm(): FormGroup {
    return this.fb.group(this.formGroup);
  }

  get getFormControls() {
    const control = this.optionCForm.get('tableRows') as FormArray;
    // console.log(control);
    return control;
  }

  ngAfterOnInit() {
    this.control = this.optionCForm.get('tableRows') as FormArray;
  }

  addRow() {
    const control =  this.optionCForm.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control =  this.optionCForm.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log('inside');
  }

}
