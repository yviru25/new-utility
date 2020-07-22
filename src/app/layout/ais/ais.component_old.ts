import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import { SharedServices } from '../../shared/shared-service';

@Component({
  selector: 'app-ais',
  templateUrl: './ais.component.html',
  styleUrls: ['./ais.component.scss'],
  providers: [SharedServices]
})
export class AisComponent implements OnInit {

  public formTestField: FormGroup;
  panelOpenState = false;
  isInfoDetails =  false;
  filerSummary: any;
  entityDtls: any;
  basicDetails: any;
  aisForm: any;
  filerSummList = [];
  infoCodeDtls = [];
  trsnInfoHeader = [];
  activeTransList = [];
  inactiveTransList = [];
  actvList = [];
  inactvList = [];
  filerList = [];
  keyValue = [];
  inactiveKeyValue = [];
  finalResultList = [];
  entityParticulars = [];
  l3InfoList = [];
  l2InfoList = [];
  groupByInfoCode = {};
  l2HeaderList = [];
  optionList = [];
  isOption = false;
  formArrayTest = [];
  isFormArray = false;

  constructor(private service: SharedServices, private fb: FormBuilder) {
    /* this.formTestField = fb.group({
      tickets: new FormArray([])
    });
      this.formArrayTest = [
          {
             inputType: 'text',
             key: 'role_name',
             label: 'Role Name',
             value: '',
             required: true
          },
          {
             inputType: 'select',
             key: 'relation',
             label: 'Relation Type',
             value: '',
             required: true,
             enum: [
                'Self',
                'Other Person'
             ]
          },
          {
             inputType: 'select',
             key: 'relation1',
             label: 'Other Relation Type',
             value: '',
             required: true,
             enum: [
                'Son',
                'Daughter',
                'Brother',
                'Sister',
                'Friends',
                'Relative'
             ]
          }

      ]; */
  }

  ngOnInit() {


    this.service.getInternalHttpRequest('assets/SampleAIS.json').subscribe((res) => {
      this.entityDtls = res.ais_form.entity_dtls;
      this.aisForm = res.ais_form.ais_id;
      this.entityParticulars = res.ais_form.entity_dtls.entity_particulars;
     this.basicDetails = res.ais_form.form_creation_info.form_details;
     this.l3InfoList = res.ais_form.info_dtls;
     this.l2HeaderList = res.ais_form.info_dtls[0].l2_header_field;
     // console.log(this.l2HeaderList);

     /* for ( let i = 0; i < this.l3InfoList.length; i++) {
         console.log(Object.keys(this.l3InfoList[i]));
     } */

     this.l3InfoList.forEach( el => {
     // console.log(el);
      this.groupByInfoCode [el.part_type] = this.groupByInfoCode [el.part_type] || [];
      /* this.groupByInfoCode [el.part_type].push(
          {
              infoCodeName: el.info_code.substring(0, 3) + ' Information',
              sumryId: el.info_smry[0].smry_id,
              info_code: el.info_code,
              info_desc: el.info_desc,
              filerName: el.info_smry[0].filer_dtls.filer_name,
              filerDesc: el.info_smry[0].filer_dtls.filer_desc,
              count_of_trans: el.info_smry[0].count_of_trans,
              smry_desc: el.info_smry[0].smry_amnt.desc,
              smry_amnt: el.info_smry[0].smry_amnt.value
          }
      ); */
      // console.log(this.groupByInfoCode);
   //  });
      this.groupByInfoCode [el.part_type].push(
          {
              infoCodeName: el.info_code.substring(0, 3) + ' Information',
              sumryId: el.info_smry[0].smry_id,
              infoCode: el.info_code,
              infoDesc: el.info_desc,
              amountSum: el.amount_sum,
              filerName: el.info_smry[0].filer_dtls.filer_name,
              filerDesc: el.info_smry[0].filer_dtls.filer_desc,
              count: el.info_smry[0].count_of_trans,
              valueDesc: el.info_smry[0].smry_amnt.desc,
              value: el.info_smry[0].smry_amnt.value
          }
      );
     });
     console.log(this.groupByInfoCode);
     this.l2InfoList.push(this.groupByInfoCode);
    // console.log(this.l2InfoList);
     this.filerSummary = res.ais_form.info_dtls;
     this.filerSummary.forEach( element => {
          const jsonDisplay = {
              infoCode: element.info_code,
              infoDesc: element.info_desc,
              infoHeader: element.trans_header_field,
              filerList: element.info_smry
          };
          this.filerSummList.push(jsonDisplay);
      });
    //  console.log(this.filerSummList);
   /*   this.filerSummList.forEach(e => {
          const jd = {
            infoCode: e.infoCode,
            infoDesc: e.infoDesc,
            filer_smry_id: e.filerList[0].filer_smry_id,
            filer_name: e.filerList[0].filer_name,
            filer_id: e.filerList[0].filer_id,
            count_of_trans: e.filerList[0].count_of_trans,
            smry_amnt_desc: e.filerList[0].smry_amnt.desc,
            amount: e.filerList[0].smry_amnt.value
          };
          this.filerList.push(jd);
      });
       console.log(this.filerList);
    }); */

  });
}

changeTab(event) {
  console.log(event);
  this.isInfoDetails = false;
}

  transDetails(filerSummId: number, infoCode: string) {
    this.isInfoDetails = true;
    const actvTrns = [];
    this.isInfoDetails = true;
    const inactiveTrnsSumm = [];
    this.actvList = [];
    this.inactvList = [];
    this.activeTransList = [];
    this.keyValue = [];
    this.inactiveKeyValue = [];
    this.finalResultList = [];
    this.inactiveTransList = [];
    this.filerSummList.forEach(el => {
      const trsnsDtlsList = el.filerList[0];
      actvTrns.push(trsnsDtlsList);
    });
    console.log(actvTrns);
    const transHeader = this.filerSummary.filter( e => e.info_code === infoCode);
    this.trsnInfoHeader = transHeader[0].trans_header_field;
    // console.log(this.trsnInfoHeader);
    const activeList = actvTrns.filter( r => r.smry_id === filerSummId);
    console.log(activeList);
    // Active Transaction
    this.activeTransactionList(activeList);
    // InActive Transaction
    activeList[0].inactive_trans.forEach(element => {
      inactiveTrnsSumm.push(element);
    });
    inactiveTrnsSumm.forEach( elm => {
       this.inactiveTransList.push(elm.data);
    });
    // console.log(this.activeTransList);
   let lebelIdInActv;
   let valueInActv;
    for (let i = 0; i < this.inactiveTransList.length; i++) {
        const maps = new Map<string, string>();
        for (let j = 0; j < this.inactiveTransList[i].length; j++) {
          lebelIdInActv = this.inactiveTransList[i][j].label_id;
          valueInActv = this.inactiveTransList[i][j].value;
          maps.set(lebelIdInActv, valueInActv);
        }
        this.inactiveKeyValue.push(maps);
    }
   // console.log(this.inactiveKeyValue);
    this.inactiveKeyValue.forEach( els => {
         const jsonObjects = {};
         els.forEach((keyss, valuess) => {
          jsonObjects[valuess] = keyss;
         });
         this.inactvList.push(jsonObjects);
    });
   // console.log(this.inactvList);

  }

  public activeTransactionList(activeList) {
    const activeTrsnSumm = [];
    activeList[0].active_trans.forEach(element => {
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

  public OldAISRenderingJSON() {
      /* this.service.getInternalHttpRequest('assets/ais.json').subscribe((res) => {
      this.entityDtls = res.ais_form.entity_dtls;
      this.aisForm = res.ais_form.ais_id;
      this.basicDetails = res.ais_form.form_creation_info.form_details;
      console.log(this.basicDetails);
      this.filerSummary = res.ais_form.info_code_dtls;
      console.log(this.entityDtls);
      this.filerSummary.forEach( element => {
          const jsonDisplay = {
              infoCode: element.info_code,
              infoDesc: element.info_desc,
              infoHeader: element.info_header_field,
              filerList: element.filer_wise_smry
          };
          this.infoCodeDtls.push(jsonDisplay);
          this.filerSummList.push(jsonDisplay);
      });
      this.filerSummList.forEach(e => {
          const jd = {
            infoCode: e.infoCode,
            infoDesc: e.infoDesc,
            filer_smry_id: e.filerList[0].filer_smry_id,
            filer_name: e.filerList[0].filer_name,
            filer_id: e.filerList[0].filer_id,
            count_of_trans: e.filerList[0].count_of_trans,
            smry_amnt_desc: e.filerList[0].smry_amnt.desc,
            amount: e.filerList[0].smry_amnt.value
          };
          this.filerList.push(jd);
      });
       console.log(this.filerList);
    }); */
  }

  /*  >>>>>>>>>>>>>>>>>>>>>>>>>>  Option Function  <<<<<<<<<<<<<<<<<<<<<< */

  getAisOption() {
    this.isOption = true;
    this.service.getInternalHttpRequest('assets/options.json').subscribe((res) => {
        this.optionList = res.ais_options.feedbackoption;
        console.log(this.optionList);
    });
  }

  getDynamicFormArray() {
     this.isFormArray = true;
     console.log('inside form array');
  }

  createOwner(values) {
     console.log(JSON.stringify(this.formTestField.value, null, 4));
  }


  getL2Info(infoCode) {
     console.log(infoCode);
  }


}
