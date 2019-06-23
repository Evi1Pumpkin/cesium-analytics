const Cesium = require('cesium/Cesium');

export class EventHandler {
    private screenSpaceEventHandler: Cesium.ScreenSpaceEventHandler;
    private eventsArray: {eventType: Cesium.ScreenSpaceEventType, value: any}[] = [];

    constructor(viewer: Cesium.Viewer) {
        this.screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        this.screenSpaceEventHandler.setInputAction(({position}: any) => {
            const ellipsoid = viewer.scene.globe.ellipsoid;
            const cartesian = viewer.camera.pickEllipsoid(position, ellipsoid);
            if (cartesian) {
                this.eventsArray.push({eventType: Cesium.ScreenSpaceEventType.LEFT_CLICK, value: cartesian})
            } else {
                console.log('Globe was not picked');
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    public getEvents() {
        return this.eventsArray;
    }

    public clearEvents() {
        this.eventsArray = [];
    }
}