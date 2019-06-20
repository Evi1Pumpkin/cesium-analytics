import PrimitiveHandler from './handlers/primitive-handler';
import { Viewer } from 'cesium';

export default class CesiumAnalyticsClient {
  private cesiumViewer: any;
  private primitiveHandler: PrimitiveHandler;

  constructor(cesiumViewer: Viewer) {
    this.cesiumViewer = cesiumViewer;
    this.primitiveHandler = new PrimitiveHandler();

    console.log('CesiumAnalyticsClient says hello');
    this.intervalRequest();
  }

  private intervalRequest() {
    setInterval(() => {
      const primitives = this.cesiumViewer.scene.primitives._primitives;
      const primitivesArray = this.primitiveHandler.getPrimitivesEntitiesRecursively(primitives);

      console.log("primitives: ");
      console.log(primitivesArray);
    }, 10000);
  }

}

// Get imagery maps:
// cesiumViewer.imageryLayers._layers.filter(Boolean).forEach(layer => console.log(layer))