import { EntitiesHandler } from './handlers/entities-handler';
import { EventHandler } from './handlers/event-handler';
import { Viewer } from 'cesium';

export default class CesiumAnalyticsClient {
  // private cesiumViewer: any;
  private entitiesHandler: EntitiesHandler;
  private eventHandler: EventHandler;

  constructor(cesiumViewer: Viewer) {
    // this.cesiumViewer = cesiumViewer;
    this.entitiesHandler = new EntitiesHandler(cesiumViewer);
    this.eventHandler = new EventHandler(cesiumViewer);

    console.log('CesiumAnalyticsClient says hello');
    this.intervalRequest();
  }

  private intervalRequest() {
    setInterval(() => {
      const primitives = this.entitiesHandler.getPrimitives();
      const entities = this.entitiesHandler.getEntities();

      console.log('Primitives', primitives);
      console.log('Entities', entities);

      const events = this.eventHandler.getEvents();
      console.log('Events', events);
      this.eventHandler.clearEvents();
    }, 10000);
  }

}

// Get imagery maps:
// cesiumViewer.imageryLayers._layers.filter(Boolean).forEach(layer => console.log(layer))