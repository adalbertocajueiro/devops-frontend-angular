import { Component, OnInit } from '@angular/core';
import { DBSchemaNode } from '../dbmodel.model';
import { SchemaService } from '../schema.service';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css'],
  providers: [SchemaService]
})
export class SchemaComponent implements OnInit {

  constructor(private schService: SchemaService) { }

  schema:any = null;
  dbSchema:DBSchemaNode|undefined = undefined;
  getSchema(){
    this.schema = this.schService.getSchema();
    console.log('Revceived schema', this.schema);
  }
  buildSchema(){
    this.dbSchema = this.schService.buildSchema();
    console.log('Mounted Schema', this.dbSchema);
  }
  ngOnInit(): void {

  }

}
