import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';


const dbConfig: DBConfig  = {
  name: 'AIS_Utility',
  version: 1,
  objectStoresMeta: [
    {
    store: 'feedback_response',
    storeConfig: { keyPath: 'feedbackId', autoIncrement: true },
    storeSchema: [
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'infoCode', keypath: 'infoCode', options: { unique: false } },
        { name: 'infoCategory', keypath: 'infoCategory', options: { unique: false } },
        { name: 'infoSource', keypath: 'infoSource', options: { unique: false } },
        { name: 'createdDate', keypath: 'createdDate', options: { unique: false } },
        { name: 'jsonResponse', keypath: 'jsonResponse', options: { unique: false } }
    ]
  },
  {
    store: 'response_data',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'ais_id', keypath: 'ais_id', options: { unique: true } },
      { name: 'pan', keypath: 'pan', options: { unique: true } },
      { name: 'pan_name', keypath: 'pan_name', options: { unique: false } }
    ]
  },
  {
    store: 'file_import_data',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
    ]
  },
]
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [],
})

export class AppModule {
}
