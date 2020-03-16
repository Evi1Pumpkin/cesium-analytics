import { EntitiesHandler } from './handlers/entities-handler';
import { EventHandler } from './handlers/event-handler';
import { ImageryLayersHandler } from './handlers/imagery-layers-handler';
import { FrameRateHandler } from './handlers/frame-rate-handler';
import { Viewer } from 'cesium';

export class CesiumAnalyticsClient {
    private entitiesHandler: EntitiesHandler;
    private eventHandler: EventHandler;
    private imageryLayersHandler: ImageryLayersHandler;
    private frameRateHandler: FrameRateHandler;

    constructor(cesiumViewer: Viewer) {
        this.entitiesHandler = new EntitiesHandler(cesiumViewer);
        this.eventHandler = new EventHandler(cesiumViewer);
        this.imageryLayersHandler = new ImageryLayersHandler(cesiumViewer);
        this.frameRateHandler = new FrameRateHandler(cesiumViewer);

        console.log('CesiumAnalyticsClient says hello');
        this.intervalRequest();
    }

    getAnalytics() {
        return {
            primitives: this.entitiesHandler.getPrimitives(),
            entities: this.entitiesHandler.getEntities(),
            events: this.eventHandler.dumpEvents(),
            imageryLayers: this.imageryLayersHandler.getImageryLayers(),
            frameRate: this.frameRateHandler.getFrameRate()
        };
    }

    private intervalRequest() {
        setInterval(() => {
            console.log(this.getAnalytics());
        }, 10000);
    }
}
