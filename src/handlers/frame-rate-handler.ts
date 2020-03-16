import { Viewer, FrameRateMonitor } from 'cesium';

export class FrameRateHandler {
    private frameRateMonitor: FrameRateMonitor;

    constructor(viewer: Viewer) {
        this.frameRateMonitor = new FrameRateMonitor({ scene: viewer.scene });
    }

    getFrameRate() {
        return this.frameRateMonitor.lastFramesPerSecond;
    }
}
