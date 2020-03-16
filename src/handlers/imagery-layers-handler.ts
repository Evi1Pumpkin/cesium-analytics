import { Viewer } from 'cesium';

export class ImageryLayersHandler {
    private viewer: Viewer;

    constructor(viewer: Viewer) {
        this.viewer = viewer;
    }

    getImageryLayers(): string[] {
        return (this.viewer.imageryLayers as any)._layers.map((layer: any) => {
            return (
                layer._imageryProvider?.url ||
                layer._imageryProvider?._imageryProvider?.url
            );
        });
    }
}
