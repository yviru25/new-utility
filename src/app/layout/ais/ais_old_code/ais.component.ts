import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServices } from '../../../shared/shared-service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
export let selectedInfoCode: any;


@Component({
  selector: 'app-ais',
  templateUrl: './ais.component.html',
  styleUrls: ['./ais.component.scss'],
  providers: [SharedServices]
})
export class AisComponent implements OnInit, AfterViewInit {
    constructor(private service: SharedServices, private route: Router) {
    }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    entityDtls: any;
    aisForm: any;
    entityParticulars: any;
    basicDetails: any;
    infoSmryDetails = [];
    groupByInfoCode = {};
    displayedColumns = ['infoCode', 'infoDesc', 'amountSum'];
    dataSource = null;
    ngOnInit() {

        // this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);


        this.service.getInternalHttpRequest('assets/Summary_L2.json').subscribe((res) => {
            this.entityDtls = res.ais_form.entity_dtls;
            this.aisForm = res.ais_form.ais_id;
            this.entityParticulars = res.ais_form.entity_dtls.entity_particulars;
            this.basicDetails = res.ais_form.form_creation_info.form_details;
            this.infoSmryDetails = res.ais_form.info_summary_dtls;
            this.infoSmryDetails.forEach(el => {
                this.groupByInfoCode [el.part_type] = this.groupByInfoCode [el.part_type] || [];
                this.groupByInfoCode [el.part_type].push(
                    {

                        infoCode: el.info_code,
                        infoDesc: el.info_desc,
                        amountSum: el.amount_sum,
                        partType: el.part_type,
                        partDesc: el.part_desc
                    }
                );
            });
            console.log(this.groupByInfoCode);
        });
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    getL2InfoList(infoCode: string) {
        selectedInfoCode = infoCode;
        this.route.navigate(['dashboard/ais-l2']);
    }

}
