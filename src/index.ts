import { EntitiesHandler } from './handlers/entities-handler';
import { EventHandler } from './handlers/event-handler';
import { ImageryLayersHandler } from './handlers/imagery-layers-handler';
import { FrameRateHandler } from './handlers/frame-rate-handler';
import { CameraHandler } from './handlers/camera-handler';
import { Analytics } from './models/analytics.model';
import { AnalyticsOptions } from './models/analytics-options.model';
import { Viewer } from 'cesium';

export class CesiumAnalyticsClient {
    private interval: NodeJS.Timeout;
    private entitiesHandler: EntitiesHandler;
    private eventHandler: EventHandler;
    private imageryLayersHandler: ImageryLayersHandler;
    private frameRateHandler: FrameRateHandler;
    private cameraHandler: CameraHandler;

    constructor(cesiumViewer: Viewer) {
        this.entitiesHandler = new EntitiesHandler(cesiumViewer);
        this.eventHandler = new EventHandler(cesiumViewer);
        this.imageryLayersHandler = new ImageryLayersHandler(cesiumViewer);
        this.frameRateHandler = new FrameRateHandler(cesiumViewer);
        this.cameraHandler = new CameraHandler(cesiumViewer.camera);
    }

    start(options: AnalyticsOptions, cb: (analytics: Analytics) => void) {
        const interval = options.interval || 60000;

        this.interval = setInterval(() => {
            cb(this.getAnalytics());
        }, interval);
    }

    stop() {
        clearInterval(this.interval);
    }

    private getAnalytics(): Analytics {
        return {
            primitives: this.entitiesHandler.getPrimitives(),
            entities: this.entitiesHandler.getEntities(),
            events: this.eventHandler.dumpEvents(),
            imageryLayers: this.imageryLayersHandler.getImageryLayers(),
            frameRate: this.frameRateHandler.getFrameRate(),
            camera: {
                position: this.cameraHandler.getCameraPosition()
            }
        };
    }
}
