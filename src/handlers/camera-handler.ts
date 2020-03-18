import { Camera, Math } from 'cesium';
import { Position } from '../models/position.model';

export class CameraHandler {
    private camera: Camera;

    constructor(camera: Camera) {
        this.camera = camera;
    }

    public getCameraPosition(): Position {
        const cartographic = this.camera.positionCartographic;
        const lon = Math.toDegrees(cartographic.longitude);
        const lat = Math.toDegrees(cartographic.latitude);
        return { lon, lat, alt: cartographic.height };
    }
}
