export interface DBModelNode {
    attributes:Set<DBModelNode>;
    parent: DBModelNode|null;
    modified: boolean;
}
export class AbstractDBModelNode implements DBModelNode {
    attributes: Set<DBModelNode>;
    parent: DBModelNode|null;
    modified: boolean;

    constructor(){
        this.attributes = new Set<DBModelNode>()
        this.parent = null 
        this.modified = false
    }
    
    setAttribute(name:string, value:string) {
        var attr = new DBAttributeNode(name,"")
        if (value != null) { //if has some value
            attr.attributeValue = value           
        } 
        this.attributes.add(attr);
    }
}
export class DBSchemaNode extends AbstractDBModelNode {

    tables:Array<DBTableNode>
    views:Array<DBViewNode>
    functions:Array<DBFunctionNode>
    procedures:Array<DBProcedureNode>
    packages:Array<DBPackageNode>
    indexes:Array<DBIndexNode>
    triggers:Array<DBTriggerNode>
    sequences:Array<DBSequenceNode>
    constructor(){
        super()
        this.tables = new Array<DBTableNode>()
        this.views = new Array<DBViewNode>()
        this.functions = new Array<DBFunctionNode>()
        this.procedures = new Array<DBProcedureNode>()
        this.packages = new Array<DBPackageNode>()
        this.indexes = new Array<DBIndexNode>()
        this.triggers = new Array<DBTriggerNode>()
        this.sequences = new Array<DBSequenceNode>()
    }
}
    export class DBTableNode extends AbstractDBModelNode {
        columns:Array<DBColumnNode>
    constraints:Array<DBConstraintNode>
    indexes:Array<DBIndexNode>
    constructor(){
        super()
        this.columns = new Array<DBColumnNode>()
        this.constraints = new Array<DBConstraintNode>()
        this.indexes = new Array<DBIndexNode>()
    }
}
export class DBViewNode extends AbstractDBModelNode {
    columns:Array<DBColumnNode>
    constructor(){
        super()
        this.columns = new Array<DBColumnNode>()
    }
}
export class DBFunctionNode extends AbstractDBModelNode {
    arguments:Array<DBArgumentNode>
    constructor(){
        super()
        this.arguments = new Array<DBArgumentNode>()
    }
}
export class DBProcedureNode extends AbstractDBModelNode {
    arguments:Array<DBArgumentNode>
    constructor(){
        super()
        this.arguments = new Array<DBArgumentNode>()
    }
}
export class DBPackageNode extends AbstractDBModelNode {
    methods:Array<DBMethodNode>
    constructor(){
        super()
        this.methods = new Array<DBMethodNode>()
    }
}
export class DBIndexNode extends AbstractDBModelNode {

}
export class DBTriggerNode extends AbstractDBModelNode {

}
export class DBSequenceNode extends AbstractDBModelNode {

}
export class DBColumnNode extends AbstractDBModelNode {

}
export class DBConstraintNode extends AbstractDBModelNode {

}

export class DBArgumentNode extends AbstractDBModelNode {

}
export class DBMethodNode extends AbstractDBModelNode {
    arguments:Array<DBArgumentNode>
    constructor(){
        super()
        this.arguments = new Array<DBArgumentNode>()
    }
}
export class DBAttributeNode extends AbstractDBModelNode{
    //do not have attributes
    attributeName:string
    attributeValue:string
  
    constructor(name:string, value:string){
        super()
        this.attributeName = name
        this.attributeValue = value
    }
    equals(otherAttr:DBAttributeNode){
      var result = false
      if(otherAttr instanceof DBAttributeNode){
        result = this.attributeName === otherAttr.attributeName
      }
      return result
    }
  }