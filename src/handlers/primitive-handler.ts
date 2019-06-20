import { PrimitiveCollection } from 'cesium';

export default class PrimitiveHandler {
  private readonly meaningfulFields: string[] = [
    '_billboards',
    '_polylines',
    '_pointPrimitives',
    // '_billboardCollection',
    '_labels',
    // '_labelsCollection',
    '_instanceIds'
];

  constructor() {}

  // Primitives:
  // this.mapsManagerService.getMap().getCesiumViewer().scene._primitives._primitives
  // .filter( x => x.length > 1)
  // .forEach(x => {
  //   x._primitives
  //   .filter(x => x.length > 1)
  //   .map(item => console.log(item))
  // });

  // primitiveCollection
  //    .filter( x => x.length > 1)
  //    .forEach(x => {
  //      x._primitives
  //      .filter(x => x.length > 1)
  //      .map(x => x._primitives.forEach(primitive => {
  // 		console.log(primitive._instanceIds)
  //      }))
  //   });

  // Entities:
  // this.mapsManagerService.getMap().getCesiumViewer().dataSources._dataSources
  // .filter( x => x._entityCollection._entities.length > 0)
  // .map(item => console.log(item));

  // get primitive -> appearance + all instances + type + is connected to an entity?
  // entities + dataSource -> create primitives, or it can be created differently

  public getPrimitivesEntitiesRecursively(
    primitiveCollection: PrimitiveCollection,
    resultTree: any = {},
    lastNameCounter: number = 1
  ) {
    if (Array.isArray(primitiveCollection)) {
      let nameCounter = lastNameCounter + 1;

      primitiveCollection.forEach(node => {
        const nodeName = node.constructor.name;
        let resultName = nodeName;
        const resultNode: any = {}; // TODO: create typing

        // check if value name already exist
        if (resultTree.hasOwnProperty(nodeName)) {
          resultName = nodeName + nameCounter;
        }
        nameCounter++;

        if (!node.hasOwnProperty('_primitives')) {
          const isPrimitive = this.meaningfulFields.some(field =>
            node.hasOwnProperty(field) && this.isPrimitiveFieldNotEmpty(node[field])
          );

          if (isPrimitive) {
            Object.assign(resultNode, ...this.handlePrimitive(node));
            resultTree[resultName] = resultNode;
          }
        }

        if (node.hasOwnProperty('_primitives') && node._primitives.length > 0) {
          this.getPrimitivesEntitiesRecursively(
            node._primitives,
            resultTree,
            nameCounter
          );
        }
      });

      return resultTree;
    }
  }

  private handlePrimitive(primitive: any) {
    const resultPrimitive: any = {}; // TODO: add typing

    this.meaningfulFields.forEach(field => {
      if (primitive.hasOwnProperty(field) && this.isPrimitiveFieldNotEmpty(primitive[field])) {
        resultPrimitive[field] = primitive[field];
      }
    });

    return resultPrimitive;
  }

  private isPrimitiveFieldNotEmpty(PrimitiveField: any) : boolean {
    let result: boolean = false;

    if (Array.isArray(PrimitiveField)) {
      result = PrimitiveField.length > 0 ? true : false;
    } else if (!Object.is(PrimitiveField, {})) {
      result = true;
    } else if (PrimitiveField) {
      result = true;
    }

    return result;
  }
}