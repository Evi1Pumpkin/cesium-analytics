"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var primitive_handler_1 = require("./handlers/primitive-handler");
var CesiumAnalyticsClient = /** @class */ (function () {
    function CesiumAnalyticsClient(cesiumViewer) {
        this.cesiumViewer = cesiumViewer;
        this.primitiveHandler = new primitive_handler_1.default();
        console.log('CesiumAnalyticsClient says hello');
        this.intervalRequest();
    }
    CesiumAnalyticsClient.prototype.intervalRequest = function () {
        var _this = this;
        setInterval(function () {
            var primitives = _this.cesiumViewer.scene.primitives._primitives;
            var primitivesTree = _this.primitiveHandler.getPrimitivesEntitiesRecursively(primitives);
            console.log("primitives: ");
            console.log(primitivesTree);
        }, 10000);
    };
    return CesiumAnalyticsClient;
}());
exports.default = CesiumAnalyticsClient;
// Get imagery maps:
// cesiumViewer.imageryLayers._layers.filter(Boolean).forEach(layer => console.log(layer))
//# sourceMappingURL=index.js.map