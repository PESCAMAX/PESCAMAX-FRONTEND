import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatapickerComponent implements OnInit {
  dateRange!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dateRange = this.fb.group({
      startDate: [''],
      endDate: ['']
    });

    this.dateRange.valueChanges.subscribe(val => {
      console.log('Date Range:', val);
    });
  }
}