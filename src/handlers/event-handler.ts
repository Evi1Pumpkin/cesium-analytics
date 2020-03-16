import { ScreenSpaceEventHandler, ScreenSpaceEventType, Viewer } from 'cesium';

export class EventHandler {
    private screenSpaceEventHandler: ScreenSpaceEventHandler;
    private eventsArray: {eventType: ScreenSpaceEventType, value: any}[] = [];

    constructor(viewer: Viewer) {
        this.screenSpaceEventHandler = new ScreenSpaceEventHandler(viewer.canvas);
        this.screenSpaceEventHandler.setInputAction(({position}: any) => {
            const ellipsoid = viewer.scene.globe.ellipsoid;
            const cartesian = viewer.camera.pickEllipsoid(position, ellipsoid);
            if (cartesian) {
                this.eventsArray.push({eventType: ScreenSpaceEventType.LEFT_CLICK, value: cartesian})
            } else {
                console.log('Globe was not picked');
            }
        }, ScreenSpaceEventType.LEFT_CLICK);
    }

    public getEvents() {
        return this.eventsArray;
    }

    public clearEvents() {
        this.eventsArray = [];
    }
}