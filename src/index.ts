import { EventHandler } from './handlers/event-handler';
import PrimitiveHandler from './handlers/entities-handler';
import { Viewer } from 'cesium';

export default class CesiumAnalyticsClient {
  private entitiesHandler: PrimitiveHandler;
  private eventHandler: EventHandler;

  constructor(cesiumViewer: Viewer) {
    this.entitiesHandler = new PrimitiveHandler(cesiumViewer);
    this.eventHandler = new EventHandler(cesiumViewer);
    this.eventHandler.getHello();

    console.log('CesiumAnalyticsClient says hello');
    this.intervalRequest();
  }

  private intervalRequest() {
    setInterval(() => {
      const primitives = {'Primitives': this.entitiesHandler.getPrimitives()};
      const entities = {'Entities': this.entitiesHandler.getEntities()};

      console.log(primitives);
      console.log(entities);
    }, 10000);
  }

}

// Get imagery maps:
// cesiumViewer.imageryLayers._layers.filter(Boolean).forEach(layer => console.log(layer))