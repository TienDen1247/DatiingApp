"use strict";
exports.__esModule = true;
exports.getPaginationHeaders = exports.getPaginationResult = void 0;
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var pagination_1 = require("../_models/pagination");
function getPaginationResult(url, params, http) {
    var paginatedResult = new pagination_1.PaginatedResult();
    return http.get(url, { observe: 'response', params: params }).pipe(operators_1.map(function (response) {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination')) {
            paginatedResult.pagiantion = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
    }));
}
exports.getPaginationResult = getPaginationResult;
function getPaginationHeaders(pageNumber, pageSize) {
    var params = new http_1.HttpParams();
    params = params.append("pageNumber", pageNumber.toString());
    params = params.append("pageSize", pageSize.toString());
    return params;
}
exports.getPaginationHeaders = getPaginationHeaders;
