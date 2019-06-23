import { PrimitiveHandler } from './handlers/primitive-handler';
import { EventHandler } from './handlers/event-handler';
import { Viewer } from 'cesium';

export class CesiumAnalyticsClient {
  private cesiumViewer: any;
  private primitiveHandler: PrimitiveHandler;
  private eventHandler: EventHandler;

  constructor(cesiumViewer: Viewer) {
    this.cesiumViewer = cesiumViewer;
    this.primitiveHandler = new PrimitiveHandler();
    this.eventHandler = new EventHandler(cesiumViewer);

    console.log('CesiumAnalyticsClient says hello');
    this.intervalRequest();
  }

  private intervalRequest() {
    setInterval(() => {
      const primitives = this.cesiumViewer.scene.primitives._primitives;
      const primitivesTree = this.primitiveHandler.getPrimitivesEntitiesRecursively(primitives);

      console.log("primitives: ");
      console.log(primitivesTree);

      const events = this.eventHandler.getEvents();
      console.log('Events', events);
      this.eventHandler.clearEvents();
    }, 10000);
  }

}

// Get imagery maps:
// cesiumViewer.imageryLayers._layers.filter(Boolean).forEach(layer => console.log(layer))