import { Viewer, PrimitiveCollection, Primitive } from "cesium";

export default class CesiumAnalyticsClient {
  private cesiumViewer: any;

  constructor(cesiumViewer: Viewer) {
    this.cesiumViewer = cesiumViewer;

    console.log("CesiumAnalyticsClient says hello");
    this.intervalRequest();
  }

  private intervalRequest() {
    setInterval(() => {
      const primitives = this.cesiumViewer.scene.primitives._primitives;

      const primitivesTree = this.getPrimitivesEntitiesRecursively(primitives);

      console.log(primitivesTree);
    }, 10000);
  }

  // Primitives:
  // this.mapsManagerService.getMap().getCesiumViewer().scene._primitives._primitives
  // .filter( x => x.length > 1)
  // .forEach(x => {
  //   x._primitives
  //   .filter(x => x.length > 1)
  //   .map(item => console.log(item))
  // });

  // Entities:
  // this.mapsManagerService.getMap().getCesiumViewer().dataSources._dataSources
  // .filter( x => x._entityCollection._entities.length > 0)
  // .map(item => console.log(item));

  // get primitive -> appearance + all instances + type + is connected to an entity?
  // entities + dataSource -> create primitives, or it can be created differently

  private getPrimitivesEntitiesRecursively(
    primitiveCollection: PrimitiveCollection,
    resultTree: any = {}
  ) {
    if (Array.isArray(primitiveCollection)) {
      let nameCounter = 1;

      primitiveCollection.forEach(node => {
        const nodeName = node.constructor.name;
        let resultName = nodeName;
        

        // check if value name already exist
        if (resultTree.hasOwnProperty(nodeName)) {
          resultName = nodeName + nameCounter;
          nameCounter++;
        }

        const resultNode: any = { type: nodeName }; // TODO: create typing

        // handle BillboardCollection
        // handle PointPrimitiveCollection
        // handle PolylineCollection
        // handle LabelCollection

        if (nodeName === 'Primitive') {
          Object.assign(resultNode, ...this.handlePrimitive(node));
        }

        resultTree[resultName] = resultNode;

        if (node.hasOwnProperty('_primitives')) {
          this.getPrimitivesEntitiesRecursively(
            node._primitives,
            resultTree[resultName]
          );
        }
      });

      return resultTree;
    }
  }

  private handlePrimitive(primitive: Primitive) {
    const resultPrimitive: any = {}; // TODO: add typing

    if (primitive.hasOwnProperty("appearance")) {
      resultPrimitive["appearance"] = primitive.appearance; // TODO: check if we get the key
    }

    if (primitive.hasOwnProperty("geometryInstances")) {
      resultPrimitive["geometryInstances"] = primitive.geometryInstances; // TODO: check if we get the key
    }

    if (primitive.hasOwnProperty("_instanceIds")) {
      resultPrimitive["_instanceIds"] = (primitive as any)._instanceIds;
    }


    // get Instances

    return resultPrimitive;
  }
}
