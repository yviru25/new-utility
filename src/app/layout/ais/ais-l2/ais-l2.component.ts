import { Component, OnInit } from '@angular/core';
import { SharedServices } from './../../../shared/shared-service';
import { Router } from '@angular/router';
import { selectedInfoCode } from '../ais.component';

@Component({
  selector: 'app-ais-l2',
  templateUrl: './ais-l2.component.html',
  styleUrls: ['./ais-l2.component.scss'],
  providers: [SharedServices]
})
export class AisL2Component implements OnInit {
  entityDtls: any;
  aisForm: any;
  entityParticulars: any;
  basicDetails: any;
  infoSmryDetails = [];
  filteredl2List = [];
  smmryHeaderField = [];
  infoSmry = [];
  infoSmryData = [];
  keyValue = [];
  l2DataList = [];
  selInfoCode: any;
  constructor(private service: SharedServices, private route: Router) { }

  ngOnInit() {
    this.service.getInternalHttpRequest('assets/Summary_L2.json').subscribe((res) => {
      this.entityDtls = res.ais_form.entity_dtls;
      this.aisForm = res.ais_form.ais_id;
      this.basicDetails = res.ais_form.form_creation_info.form_details;
      this.infoSmryDetails = res.ais_form.info_summary_dtls;
      this.infoSmryDetails.forEach( el => {
            this.filteredl2List = this.infoSmryDetails.filter( f => f.info_code === selectedInfoCode);
      });
      console.log(this.filteredl2List);
      this.smmryHeaderField = this.filteredl2List[0].smmry_header_field;
      this.filteredl2List.forEach(el2 => {
            this.infoSmry = el2.info_smry;
      });
      for (let i = 0; i < this.infoSmry.length; i++) {
           this.infoSmryData.push(this.infoSmry[i].data);
      }
      console.log(this.infoSmryData);
      // console.log(this.infoSmry);

      let lebelId;
      let value;
      for (let i = 0; i < this.infoSmryData.length; i++) {
        const map = new Map<string, string>();
        for (let j = 0; j < this.infoSmryData[i].length; j++) {
            lebelId = this.infoSmryData[i][j].label_id;
            value = this.infoSmryData[i][j].value;
            map.set(lebelId, value);
        }
        this.keyValue.push(map);
      }

      this.keyValue.forEach( el => {
        const jsonObject = {};
       // console.log(el);
        el.forEach((keys, values) => {
          jsonObject[values] = keys;
        });
        this.l2DataList.push(jsonObject);
      });
      console.log(this.l2DataList);

    });
  }

  getL1Details() {
     this.route.navigate(['dashboard/ais-l1']);
  }

}
