import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServices } from '../../shared/shared-service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { DynamicDialogComponent } from '../../shared/dyanmic-dialog/dynamic-dialog.component';
import { PopupMsgDialogComponent } from '../../shared/feedback/popup-msg-dialog/popup-msg-dialog.component';
import { BulkDialogComponent } from '../../shared/bulk-dialog/bulk-dialog.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
export let selectedInfoCode: any;


@Component({
  selector: 'app-ais',
  templateUrl: './ais.component.html',
  styleUrls: ['./ais.component.scss'],
  providers: [SharedServices]
})
export class AisComponent implements OnInit {
    constructor(private service: SharedServices, private route: Router,
      private dialog: MatDialog, private dbService: NgxIndexedDBService) {
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
    dataList = [];
    infoSmry = [];
    infoSmryData = [];
    keyValue = [];
    l2DataList = [];
    activeTransList = [];
    actvList = [];
    keyValueForL1 = [];
    length = 0;
    jsonImportedData = [];
    finYear: any;
    feedbackOption = [];
    infoMetaData = [];
    l1CheckedDataList = [];
    ngOnInit() {

        // this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
        this.dbService.getAll('file_import_data').then( res => {
             console.log(res);
        });

        this.service.getInternalHttpRequest('assets/info_metadata.json').subscribe( res => {
           this.infoMetaData = res.info_data_metadata;
           console.log(this.infoMetaData);
        });


        this.dbService.getAll('file_import_data').then( res => {
            this.entityDtls = res[0]['data']['ais_form'].entity_dtls;
            this.aisForm = res[0]['data']['ais_form'].ais_id;
            this.entityParticulars = res[0]['data']['ais_form'].entity_dtls.entity_particulars;
            this.basicDetails = res[0]['data']['ais_form'].form_creation_info.form_details;
            this.infoSmryDetails = res[0]['data']['ais_form'].info_summary_dtls;
            this.infoSmryDetails.forEach(el => {
                this.dataList = [];
                this.actvList = [];
                this.l2DataList = [];
                this.dataList.push(el);
                this.getTransposeDataList();
                this.activeTransactionList(el.active_trans);
                this.groupByInfoCode [el.part_type] = this.groupByInfoCode [el.part_type] || [];
                this.groupByInfoCode [el.part_type].push(
                    {

                        infoCode: el.info_code,
                        infoDesc: el.info_desc,
                        amountSum: el.amount_sum,
                        partType: el.part_type,
                        partDesc: el.part_desc,
                        infoSmryHeader: el.smmry_header_field,
                        infoL1SmryHdr: el.information_header_field,
                        infoSmryList: this.l2DataList,
                        activeTrsnList: this.actvList
                    }
                );
            });
            console.log(this.groupByInfoCode);
        });
    }
    /* ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    } */

    getL2InfoList(infoCode: string) {
        selectedInfoCode = infoCode;
        this.route.navigate(['dashboard/ais-l2']);
    }

    getTransposeDataList() {
        this.l2DataList = [];
        this.infoSmryData = [];
        this.keyValue = [];
        this.dataList.forEach(el2 => {
            this.infoSmry = el2.info_smry;
      });
      for (let i = 0; i < this.infoSmry.length; i++) {
           this.infoSmryData.push(this.infoSmry[i].data);
      }
      // console.log(this.infoSmryData);
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
    }

    public activeTransactionList(activeList) {
        this.actvList = [];
        this.activeTransList = [];
        this.keyValueForL1 = [];
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
          this.keyValueForL1.push(map);
      }
      // console.log(this.keyValue);
      this.keyValueForL1.forEach( el => {
           const jsonObject = {};
          // console.log(el);
           el.forEach((keys, values) => {
             jsonObject[values] = keys;
           });
           this.actvList.push(jsonObject);
      });
      // console.log(this.actvList);
    }
    OnPageChange(evnt, dataList) {
      const startIndex = evnt.pageIndex * evnt.pageSize;
      let endIndex = startIndex + evnt.pageSize;
      if (endIndex > this.length) {
          endIndex = this.length;
      }
    }


    openDialog(selectedData, selectedL1Header, actvTrnsList) {
      console.log(this.l1CheckedDataList);
      if (this.l1CheckedDataList.length > 0) {
        if (this.l1CheckedDataList.length === 1) {
          let filteredMetaData = [];
          this.infoMetaData.forEach(el => {
              filteredMetaData = this.infoMetaData.filter( f => f.info_code === selectedData.infoCode);
              console.log(filteredMetaData);
          });
          this.service.getInternalHttpRequest('assets/options.json').subscribe( res => {
                this.feedbackOption = res.ais_options.feedbackoption;
                const dialogRef = this.dialog.open(DynamicDialogComponent , {
                  width: 'auto',
                  maxWidth: 'none !important',
                  data: {
                    feedback: this.feedbackOption,
                    metaDataInfoField: this.infoMetaData[0].field,
                    checkedInfoList: this.l1CheckedDataList,
                    l1headerList: selectedL1Header,
                    activeTransList: actvTrnsList
                  }
                });
                dialogRef.afterClosed().subscribe(result => {
                  console.log(`Dialog result: ${result}`);
                });
          });
        } else {
            const dialogRef = this.dialog.open(BulkDialogComponent , {
              width: 'auto',
              maxWidth: 'none !important',
              height: 'auto',
              data: {
                feedback: this.feedbackOption,
                metaDataInfoField: this.infoMetaData[0].field,
                checkedInfoList: this.l1CheckedDataList,
                l1headerList: selectedL1Header,
                activeTransList: actvTrnsList
              }
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
            });
        }
      } else {
        const dialogRef = this.dialog.open(PopupMsgDialogComponent , {
          width: 'auto',
          maxWidth: 'none !important',
          data: {
            message: 'Please select atleast one row',
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
    }

    checkBoxCheck(event, selectedInfoHeader, selectedData) {
      /* console.log(event.checked);
      console.log(selectedInfoHeader);  */
      if (event.checked) {
        this.l1CheckedDataList.push(selectedData);
        console.log(this.l1CheckedDataList);
      } else {
         for (let i = 0; i < this.l1CheckedDataList.length; i++) {
               if (this.l1CheckedDataList[i].tsn_id === selectedData.tsn_id) {
                 console.log(i);
                 this.l1CheckedDataList.splice(i, 1);
          }
         }
         console.log(this.l1CheckedDataList);
      }
    }



    /* onFileSelected(event): void {
      const file = event.srcElement.files[0];
      if (file) {
          const jsonData: any = [];
          let jsonArray;
          const reader = new FileReader();
          reader.readAsText(file, 'UTF-8');
          reader.onload = function (evt) {
              jsonData.push(evt.target.result);
              jsonArray = JSON.parse(jsonData);
              this.jsonImportedData = jsonArray;
              console.log(this.jsonImportedData);
          };
          reader.onerror = function (evt) {
              alert('error reading file');
          };
          this.entityParticulars = this.jsonImportedData.ais_form.entity_dtls.entity_particulars;
          console.log(this.entityParticulars);
      }
    } */

}
