import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServices } from './../../../shared/shared-service';

@Component({
  selector: 'app-ais-l1',
  templateUrl: './ais-l1.component.html',
  styleUrls: ['./ais-l1.component.scss'],
  providers: [SharedServices]
})
export class AisL1Component implements OnInit {
  aisForm: any;
  basicDetails: any;
  infoSmryDetails: any;
  entityId: any;
  entityType: any;
  infoDtls: any;
  infoHeaderField = [];
  filerDtlsOfL1: any;
  activeTransList = [];
  keyValue = [];
  actvList = [];

  constructor(private service: SharedServices, private route: Router) { }

  ngOnInit() {
    this.service.getInternalHttpRequest('assets/L1.json').subscribe((res) => {
      this.entityId = res.ais_form.entity_id;
      this.entityType = res.ais_form.entity_type;
      this.aisForm = res.ais_form.ais_id;
      this.basicDetails = res.ais_form.form_creation_info.form_details;
      this.infoDtls = res.ais_form.info_dtls;
      console.log(this.infoDtls);
      this.filerDtlsOfL1 = this.infoDtls.filer_dtls;
      console.log(this.filerDtlsOfL1);
      this.infoHeaderField = this.infoDtls.information_header_field;
      console.log(this.infoHeaderField);
      this.activeTransactionList(this.infoDtls.active_trans);
    });
  }

  public activeTransactionList(activeList) {
    const activeTrsnSumm = [];
    activeList.forEach(element => {
      activeTrsnSumm.push(element);
  });
  activeTrsnSumm.forEach( elm => {
     this.activeTransList.push(elm.data);
  });
 // console.log(this.activeTransList);
 let lebelId;
 let value;
  for (let i = 0; i < this.activeTransList.length; i++) {
      const map = new Map<string, string>();
      for (let j = 0; j < this.activeTransList[i].length; j++) {
          lebelId = this.activeTransList[i][j].label_id;
          value = this.activeTransList[i][j].value;
          map.set(lebelId, value);
      }
      this.keyValue.push(map);
  }
  // console.log(this.keyValue);
  this.keyValue.forEach( el => {
       const jsonObject = {};
      // console.log(el);
       el.forEach((keys, values) => {
         jsonObject[values] = keys;
       });
       this.actvList.push(jsonObject);
  });
  console.log(this.actvList);
  }

}
