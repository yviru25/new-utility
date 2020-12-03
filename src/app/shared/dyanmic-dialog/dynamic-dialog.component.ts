import { Component, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dynamic-dialog',
    templateUrl: 'dynamic-dialog.component.html',
    styleUrls: ['dynamic-dialog.component.scss']
})

export class DynamicDialogComponent {
    public selectedOption: any;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(data);
    }
}
