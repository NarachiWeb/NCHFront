"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var JwtRequestOptions = /** @class */ (function (_super) {
    __extends(JwtRequestOptions, _super);
    function JwtRequestOptions(customOptions) {
        var _this = _super.call(this) || this;
        var user = JSON.parse(localStorage.getItem('currentUser'));
        _this.token = user && user.token;
        _this.headers.append('Content-Type', 'application/json');
        _this.headers.append('Authorization', 'Bearer ' + _this.token);
        if (customOptions && customOptions.params)
            _this.params = customOptions.params;
        return _this;
    }
    return JwtRequestOptions;
}(http_1.BaseRequestOptions));
exports.JwtRequestOptions = JwtRequestOptions;
//# sourceMappingURL=jwt.options.js.map