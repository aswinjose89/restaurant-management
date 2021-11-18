import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule, AgGridAngular } from 'ag-grid-angular';

const AgGridComp = [
  AgGridModule
]

@NgModule({
    declarations: [],
    imports: [
        AgGridComp
    ],
    exports: [
        AgGridComp,
    ]
})
export class NgAgGridModule { }
