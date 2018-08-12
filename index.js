"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CesiumAnalyticsClient = /** @class */ (function () {
    function CesiumAnalyticsClient(cesiumViewer) {
        this.cesiumViewer = cesiumViewer;
        console.log("CesiumAnalyticsClient says hello");
        this.intervalRequest();
    }
    CesiumAnalyticsClient.prototype.intervalRequest = function () {
        var _this = this;
        setInterval(function () {
            var primitives = _this.cesiumViewer.scene.primitives._primitives;
            var primitivesTree = _this.getPrimitivesEntitiesRecursively(primitives);
            console.log(primitivesTree);
        }, 10000);
    };
    // Primitives:
    // this.mapsManagerService.getMap().getCesiumViewer().scene._primitives._primitives
    // .filter( x => x.length > 1)
    // .forEach(x => {
    //   x._primitives
    //   .filter(x => x.length > 1)
    //   .map(item => console.log(item))
    // });
    // Entities:
    // this.mapsManagerService.getMap().getCesiumViewer().dataSources._dataSources
    // .filter( x => x._entityCollection._entities.length > 0)
    // .map(item => console.log(item));
    // get primitive -> appearance + all instances + type + is connected to an entity?
    // entities + dataSource -> create primitives, or it can be created differently
    CesiumAnalyticsClient.prototype.getPrimitivesEntitiesRecursively = function (primitiveCollection, resultTree) {
        var _this = this;
        if (resultTree === void 0) { resultTree = {}; }
        if (Array.isArray(primitiveCollection)) {
            var nameCounter_1 = 1;
            primitiveCollection.forEach(function (node) {
                var nodeName = node.constructor.name;
                var resultName = nodeName;
                // check if value name already exist
                if (resultTree.hasOwnProperty(nodeName)) {
                    resultName = nodeName + nameCounter_1;
                    nameCounter_1++;
                }
                var resultNode = { type: nodeName }; // TODO: create typing
                // handle BillboardCollection
                // handle PointPrimitiveCollection
                // handle PolylineCollection
                // handle LabelCollection
                if (nodeName === 'Primitive') {
                    Object.assign.apply(Object, [resultNode].concat(_this.handlePrimitive(node)));
                }
                resultTree[resultName] = resultNode;
                if (node.hasOwnProperty('_primitives')) {
                    _this.getPrimitivesEntitiesRecursively(node._primitives, resultTree[resultName]);
                }
            });
            return resultTree;
        }
    };
    CesiumAnalyticsClient.prototype.handlePrimitive = function (primitive) {
        var resultPrimitive = {}; // TODO: add typing
        if (primitive.hasOwnProperty("appearance")) {
            resultPrimitive["appearance"] = primitive.appearance; // TODO: check if we get the key
        }
        if (primitive.hasOwnProperty("geometryInstances")) {
            resultPrimitive["geometryInstances"] = primitive.geometryInstances; // TODO: check if we get the key
        }
        if (primitive.hasOwnProperty("_instanceIds")) {
            resultPrimitive["_instanceIds"] = primitive._instanceIds;
        }
        // get Instances
        return resultPrimitive;
    };
    return CesiumAnalyticsClient;
}());
exports.default = CesiumAnalyticsClient;
//# sourceMappingURL=index.js.map