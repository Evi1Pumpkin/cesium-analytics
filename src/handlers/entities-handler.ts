import { PrimitiveCollection, Viewer } from 'cesium';

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
  private readonly cesiumViewer: Viewer;

  constructor(viewer: Viewer) {
    this.cesiumViewer = viewer;
  }

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

  public getEntities() {
    return (this.cesiumViewer.dataSources as any)
    ._dataSources.filter( (x: any) => x._entityCollection._entities.length > 0)
  }

  public getPrimitives() {
    return this.getPrimitivesRecursively(
      (this.cesiumViewer.scene.primitives as any)._primitives
    );
  }

  private getPrimitivesRecursively(
    primitiveCollection: PrimitiveCollection,
    resultArr: any[] = []
  ) {
    if (Array.isArray(primitiveCollection)) {
      primitiveCollection.forEach(node => {
        if (!node.hasOwnProperty('_primitives')) {
          const isPrimitive = this.meaningfulFields.some(
            field =>
              node.hasOwnProperty(field) &&
              this.isPrimitiveFieldNotEmpty(node[field])
          );

          if (isPrimitive) {
            const resultNode: any = { primitiveName: node.constructor.name };

            Object.assign(resultNode, ...this.handlePrimitive(node));
            resultArr.push(resultNode);
          }
        }

        if (node.hasOwnProperty('_primitives') && node._primitives.length > 0) {
          this.getPrimitivesRecursively(node._primitives, resultArr);
        }
      });
    }

    return resultArr;
  }

  private handlePrimitive(primitive: any) {
    const resultPrimitive: any = {}; // TODO: add typing

    this.meaningfulFields.forEach(field => {
      if (
        primitive.hasOwnProperty(field) &&
        this.isPrimitiveFieldNotEmpty(primitive[field])
      ) {
        resultPrimitive[field] = primitive[field];
      }
    });

    return resultPrimitive;
  }

  private isPrimitiveFieldNotEmpty(PrimitiveField: any): boolean {
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
