import { ScreenSpaceEventHandler, Viewer } from "cesium";
const Cesium = require('cesium/Source/Cesium');

export class EventHandler {
    private viewer: Viewer;
    private handler: ScreenSpaceEventHandler;

    constructor(viewer: Viewer) {
        this.viewer = viewer;
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        this.registerEvents();
    }

    private registerEvents() {
        this.handler.setInputAction(({position}) => {
            // var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);
            const ellipsoid = this.viewer.scene.globe.ellipsoid;
            const cartesian = this.viewer.camera.pickEllipsoid(position, ellipsoid);
            if (cartesian) {
                const cartographic = ellipsoid.cartesianToCartographic(cartesian);
                const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
                const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
                console.log(longitudeString, latitudeString);
            } else {
                console.log('NOT IN GLOBE');
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    public getHello() {
        return 'Hello';
    }
}