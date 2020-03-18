import { ScreenSpaceEventType, Cartesian3 } from 'cesium';

export interface EventAnalytics {
    eventType: ScreenSpaceEventType;
    value: Cartesian3;
}
