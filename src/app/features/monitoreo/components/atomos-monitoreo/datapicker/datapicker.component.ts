import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-datapicker',
  templateUrl: './datapicker.component.html',
  styleUrls: ['./datapicker.component.css']
})
export class DatapickerComponent implements OnInit, AfterViewInit {
  @Input() minDate!: Date;
  @Input() maxDate: Date = new Date();
  @Output() dateRangeSelected = new EventEmitter<{ startDate: Date, endDate: Date }>();

  dateRange!: FormGroup;
  @ViewChild('picker') picker!: MatDateRangePicker<Date>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dateRange = this.fb.group({
      startDate: [null],
      endDate: [null]
    });

    this.dateRange.valueChanges.subscribe(val => {
      if (val.startDate && val.endDate) {
        this.dateRangeSelected.emit({
          startDate: val.startDate,
          endDate: val.endDate
        });
      }
    });
  }

  ngAfterViewInit() {
    // Abre el picker automáticamente después de que la vista se inicializa
    setTimeout(() => {
      if (this.picker) {
        this.picker.open();
      }
    });
  }

  disableDates = (date: Date): boolean => {
    return date > this.maxDate || date < this.minDate;
  }
}