import { EventAnalytics } from './event-analytics.model';
import { Position } from './position.model';

export interface Analytics {
    primitives: any;
    entities: any;
    events: EventAnalytics[];
    imageryLayers: string[];
    frameRate: number;
    camera: {
        position: Position;
    };
}
