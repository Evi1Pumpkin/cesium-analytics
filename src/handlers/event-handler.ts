import { ScreenSpaceEventHandler, ScreenSpaceEventType, Viewer, Cartesian3 } from 'cesium';

export class EventHandler {
    private screenSpaceEventHandler: ScreenSpaceEventHandler;
    private eventsArray: {eventType: ScreenSpaceEventType, value: Cartesian3}[] = [];

    constructor(viewer: Viewer) {
        this.screenSpaceEventHandler = new ScreenSpaceEventHandler(viewer.canvas);
        this.screenSpaceEventHandler.setInputAction(({position}) => {
            const ellipsoid = viewer.scene.globe.ellipsoid;
            const cartesian = viewer.camera.pickEllipsoid(position, ellipsoid);
            if (cartesian) {
                this.eventsArray.push({eventType: ScreenSpaceEventType.LEFT_CLICK, value: cartesian})
            } else {
                console.log('Globe was not picked');
            }
        }, ScreenSpaceEventType.LEFT_CLICK);
    }

    public dumpEvents() {
        const events = this.eventsArray;
        this.eventsArray = [];
        return events;
    }
}