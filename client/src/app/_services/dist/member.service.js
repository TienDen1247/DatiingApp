"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var pagination_1 = require("../_models/pagination");
var MemberService = /** @class */ (function () {
    function MemberService(http) {
        this.http = http;
        this.baseUrl = environment_1.environment.apiUrl;
        this.members = [];
    }
    MemberService.prototype.getMembers = function (userParams) {
        var params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
        params = params.append('minAge', userParams.minAge.toString());
        params = params.append('maxAge', userParams.maxAge.toString());
        params = params.append('gender', userParams.gender.toString());
        return this.getPaginationResult(this.baseUrl + 'users', params);
    };
    MemberService.prototype.getPaginationHeaders = function (pageNumber, pageSize) {
        var params = new http_1.HttpParams();
        params = params.append("pageNumber", pageNumber.toString());
        params = params.append("pageSize", pageSize.toString());
        return params;
    };
    MemberService.prototype.getMember = function (username) {
        var member = this.members.find(function (x) { return x.username === username; });
        if (member !== undefined)
            return rxjs_1.of(member);
        return this.http.get(this.baseUrl + 'users/' + username);
    };
    MemberService.prototype.updateMember = function (member) {
        var _this = this;
        return this.http.put(this.baseUrl + 'users', member).pipe(operators_1.map(function () {
            var index = _this.members.indexOf(member);
            _this.members[index] = member;
        }));
    };
    MemberService.prototype.setMainPhoto = function (photoId) {
        return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
    };
    MemberService.prototype.deletePhoto = function (photoId) {
        return this.http["delete"](this.baseUrl + 'users/delete-photo/' + photoId);
    };
    MemberService.prototype.getPaginationResult = function (url, params) {
        var paginatedResult = new pagination_1.PaginatedResult();
        return this.http.get(url, { observe: 'response', params: params }).pipe(operators_1.map(function (response) {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination')) {
                paginatedResult.pagiantion = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    };
    MemberService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MemberService);
    return MemberService;
}());
exports.MemberService = MemberService;
