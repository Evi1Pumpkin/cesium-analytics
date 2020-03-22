import {
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    Viewer,
    Cartesian2
} from 'cesium';
import { EventAnalytics } from '../models/event-analytics.model';

export class EventHandler {
    private viewer: Viewer;
    private screenSpaceEventHandler: ScreenSpaceEventHandler;
    private eventsArray: EventAnalytics[] = [];

    constructor(viewer: Viewer) {
        this.viewer = viewer;
        this.screenSpaceEventHandler = new ScreenSpaceEventHandler(
            viewer.canvas
        );

        this.screenSpaceEventHandler.setInputAction(({ position }) => {
            this.addEvent(ScreenSpaceEventType.LEFT_CLICK, position);
        }, ScreenSpaceEventType.LEFT_CLICK);

        this.screenSpaceEventHandler.setInputAction(({ position }) => {
            this.addEvent(ScreenSpaceEventType.LEFT_DOUBLE_CLICK, position);
        }, ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }

    public dumpEvents() {
        const events = this.eventsArray;
        this.eventsArray = [];
        return events;
    }

    private addEvent(eventType: ScreenSpaceEventType, position: Cartesian2) {
        const ellipsoid = this.viewer.scene.globe.ellipsoid;
        const cartesian = this.viewer.camera.pickEllipsoid(position, ellipsoid);

        if (cartesian) {
            this.eventsArray.push({
                eventType,
                value: cartesian
            });
        } else {
            console.log('Globe was not picked');
        }
    }
}
