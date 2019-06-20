import { Viewer } from 'cesium';
export default class CesiumAnalyticsClient {
    private cesiumViewer;
    private primitiveHandler;
    constructor(cesiumViewer: Viewer);
    private intervalRequest;
}
