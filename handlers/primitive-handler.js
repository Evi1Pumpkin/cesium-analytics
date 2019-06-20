"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PrimitiveHandler = /** @class */ (function () {
    function PrimitiveHandler() {
        this.meaningfulFields = [
            '_billboards',
            '_polylines',
            '_pointPrimitives',
            // '_billboardCollection',
            '_labels',
            // '_labelsCollection',
            '_instanceIds'
        ];
    }
    // Primitives:
    // this.mapsManagerService.getMap().getCesiumViewer().scene._primitives._primitives
    // .filter( x => x.length > 1)
    // .forEach(x => {
    //   x._primitives
    //   .filter(x => x.length > 1)
    //   .map(item => console.log(item))
    // });
    // primitiveCollection
    //    .filter( x => x.length > 1)
    //    .forEach(x => {
    //      x._primitives
    //      .filter(x => x.length > 1)
    //      .map(x => x._primitives.forEach(primitive => {
    // 		console.log(primitive._instanceIds)
    //      }))
    //   });
    // Entities:
    // this.mapsManagerService.getMap().getCesiumViewer().dataSources._dataSources
    // .filter( x => x._entityCollection._entities.length > 0)
    // .map(item => console.log(item));
    // get primitive -> appearance + all instances + type + is connected to an entity?
    // entities + dataSource -> create primitives, or it can be created differently
    PrimitiveHandler.prototype.getPrimitivesEntitiesRecursively = function (primitiveCollection, resultTree, lastNameCounter) {
        var _this = this;
        if (resultTree === void 0) { resultTree = {}; }
        if (lastNameCounter === void 0) { lastNameCounter = 1; }
        if (Array.isArray(primitiveCollection)) {
            var nameCounter_1 = lastNameCounter + 1;
            primitiveCollection.forEach(function (node) {
                var nodeName = node.constructor.name;
                var resultName = nodeName;
                var resultNode = {}; // TODO: create typing
                // check if value name already exist
                if (resultTree.hasOwnProperty(nodeName)) {
                    resultName = nodeName + nameCounter_1;
                }
                nameCounter_1++;
                if (!node.hasOwnProperty('_primitives')) {
                    var isPrimitive = _this.meaningfulFields.some(function (field) {
                        return node.hasOwnProperty(field) && _this.isPrimitiveFieldNotEmpty(node[field]);
                    });
                    if (isPrimitive) {
                        Object.assign.apply(Object, [resultNode].concat(_this.handlePrimitive(node)));
                        resultTree[resultName] = resultNode;
                    }
                }
                if (node.hasOwnProperty('_primitives') && node._primitives.length > 0) {
                    _this.getPrimitivesEntitiesRecursively(node._primitives, resultTree, nameCounter_1);
                }
            });
            return resultTree;
        }
    };
    PrimitiveHandler.prototype.handlePrimitive = function (primitive) {
        var _this = this;
        var resultPrimitive = {}; // TODO: add typing
        this.meaningfulFields.forEach(function (field) {
            if (primitive.hasOwnProperty(field) && _this.isPrimitiveFieldNotEmpty(primitive[field])) {
                resultPrimitive[field] = primitive[field];
            }
        });
        return resultPrimitive;
    };
    PrimitiveHandler.prototype.isPrimitiveFieldNotEmpty = function (PrimitiveField) {
        var result = false;
        if (Array.isArray(PrimitiveField)) {
            result = PrimitiveField.length > 0 ? true : false;
        }
        else if (!Object.is(PrimitiveField, {})) {
            result = true;
        }
        else if (PrimitiveField) {
            result = true;
        }
        return result;
    };
    return PrimitiveHandler;
}());
exports.default = PrimitiveHandler;
//# sourceMappingURL=primitive-handler.js.map