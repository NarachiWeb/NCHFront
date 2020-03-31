"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_service_1 = require("./jwt.service");
function httpServiceFactory(backend, options, authService) {
    return new jwt_service_1.JwtService(backend, options, authService);
}
exports.httpServiceFactory = httpServiceFactory;
//# sourceMappingURL=jwt.factory.js.map