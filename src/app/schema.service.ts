import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DBArgumentNode, DBAttributeNode, DBColumnNode, DBConstraintNode, DBFunctionNode, DBIndexNode, DBMethodNode, DBPackageNode, DBProcedureNode, DBSchemaNode, DBSequenceNode, DBTableNode, DBTriggerNode, DBViewNode } from './dbmodel.model';
import { collectExternalReferences } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  schema : any = null;
  dbSchema: DBSchemaNode|undefined = undefined;

  constructor(private httpClient: HttpClient) { }

  getSchema(){
    
    this.httpClient.get<any>('https://localhost:5001/schema').subscribe(
      response => {
        this.schema = response;
      }
    )
    return this.schema;
  }

  buildSchema(){
    if(this.schema != null){
      this.dbSchema = this.buildSchemaNode(this.schema)
    }
    return this.dbSchema
  }
  getSize(coll:Array<any>){
    return collectExternalReferences.length
  }
  buildSchemaNode(sch:any){
    this.dbSchema = new DBSchemaNode()
    for(var item of sch.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      this.dbSchema.attributes.add(attr);
    }
    for(var item of sch.Tables){
      var table = this.buildTableNode(item)
      table.parent = this.dbSchema;
      this.dbSchema.tables.push(table)
    }
    for(var item of sch.Views){
      var view = this.buildViewNode(item)
      view.parent = this.dbSchema;
      this.dbSchema.views.push(view)
    }
    for(var item of sch.Functions){
      var func = this.buildFunctionNode(item)
      func.parent = this.dbSchema;
      this.dbSchema.functions.push(func)
    }
    for(var item of sch.Procedures){
      var proc = this.buildProcedureNode(item)
      proc.parent = this.dbSchema;
      this.dbSchema.procedures.push(proc)
    }
    for(var item of sch.Packages){
      var pack = this.buildPackageNode(item)
      pack.parent = this.dbSchema;
      this.dbSchema.packages.push(pack)
    }
    for(var item of sch.Indexes){
      var index = this.buildIndexNode(item)
      index.parent = this.dbSchema;
      this.dbSchema.indexes.push(index)
    }
    for(var item of sch.Sequences){
      var seq = this.buildSequenceNode(item)
      seq.parent = this.dbSchema;
      this.dbSchema.sequences.push(seq)
    }
    for(var item of sch.Triggers){
      var trig = this.buildTriggerNode(item)
      trig.parent = this.dbSchema;
      this.dbSchema.triggers.push(trig)
    }
    
    //console.log('SchemaNode: ', this.dbSchema);
    return this.dbSchema;
  } 
  buildTableNode(obj:any){
    var node = new DBTableNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      attr.parent = node;
      node.attributes.add(attr);
    }
    for(var item of obj.Columns){
      var child = this.buildColumnNode(item)
      child.parent = node;
      node.columns.push(child)
    }
    for(var item of obj.Constraints){
      var child = this.buildConstraintNode(item)
      child.parent = node;
      node.constraints.push(child)
    }
    for(var item of obj.Indexes){
      var child = this.buildIndexNode(item)
      child.parent = node;
      node.indexes.push(child)
    }
    
    return node;
  }
  buildViewNode(obj:any){
    var node = new DBViewNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      attr.parent = node;
      node.attributes.add(attr);
    }
    for(var item of obj.Columns){
      var child = this.buildColumnNode(item)
      child.parent = node;
      node.columns.push(child)
    }
    return node;
  }
  buildFunctionNode(obj:any){
    var node = new DBFunctionNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      attr.parent = node;
      node.attributes.add(attr);
    }
    for(var item of obj.Arguments){
      var child = this.buildArgumentNode(item)
      child.parent = node;
      node.arguments.push(child)
    }
    return node;
  }
  buildProcedureNode(obj:any){
    var node = new DBProcedureNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      attr.parent = node;
      node.attributes.add(attr);
    }
    for(var item of obj.Arguments){
      var child = this.buildArgumentNode(item)
      child.parent = node;
      node.arguments.push(child)
    }
    return node;
  }
  buildPackageNode(obj:any){
    var node = new DBPackageNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      attr.parent = node;
      node.attributes.add(attr);
    }
    for(var item of obj.Methods){
      var child = this.buildMethodNode(item)
      child.parent = node;
      node.methods.push(child)
    }
    return node;
  }
  buildMethodNode(obj:any){
    var node = new DBMethodNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      attr.parent = node;
      node.attributes.add(attr);
    }
    for(var item of obj.Arguments){
      var child = this.buildArgumentNode(item)
      child.parent = node;
      node.arguments.push(child)
    }
    return node;
  }
  buildColumnNode(columnObject:any){
    var node = new DBColumnNode();
    for(var item of columnObject.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      node.attributes.add(attr);
    }
    return node;
  }
  buildConstraintNode(obj:any){
    var node = new DBConstraintNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      node.attributes.add(attr);
    }
    return node;
  }
  buildArgumentNode(obj:any){
    var node = new DBArgumentNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      node.attributes.add(attr);
    }
    return node;
  }
  buildIndexNode(obj:any){
    var node = new DBIndexNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      node.attributes.add(attr);
    }
    return node;
  }
  buildSequenceNode(obj:any){
    var node = new DBSequenceNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      node.attributes.add(attr);
    }
    return node;
  }
  buildTriggerNode(obj:any){
    var node = new DBTriggerNode();
    for(var item of obj.Attributes){
      var attr = new DBAttributeNode(item.attributeName,item.attributeValue);
      node.attributes.add(attr);
    }
    return node;
  }
  
  
}
