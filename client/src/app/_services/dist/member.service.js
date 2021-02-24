"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.MemberService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var userParams_1 = require("../_models/userParams");
var paginationHelper_1 = require("./paginationHelper");
var MemberService = /** @class */ (function () {
    function MemberService(http, accountService) {
        var _this = this;
        this.http = http;
        this.accountService = accountService;
        this.baseUrl = environment_1.environment.apiUrl;
        this.members = [];
        this.memberCache = new Map();
        this.accountService.currentUser$.pipe(operators_1.take(1)).subscribe(function (user) {
            _this.user = user;
            _this.userParams = new userParams_1.UserParams(user);
        });
    }
    MemberService.prototype.getUserParams = function () {
        return this.userParams;
    };
    MemberService.prototype.setUserParams = function (params) {
        this.userParams = params;
    };
    MemberService.prototype.resetUserParams = function () {
        return new userParams_1.UserParams(this.user);
    };
    MemberService.prototype.getMembers = function (userParams) {
        var _this = this;
        var response = this.memberCache.get(Object.values(userParams).join('-'));
        if (response) {
            return rxjs_1.of(response);
        }
        var params = paginationHelper_1.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
        params = params.append('minAge', userParams.minAge.toString());
        params = params.append('maxAge', userParams.maxAge.toString());
        params = params.append('gender', userParams.gender.toString());
        params = params.append('orderby', userParams.orderby.toString());
        return paginationHelper_1.getPaginationResult(this.baseUrl + 'users', params, this.http)
            .pipe(operators_1.map(function (response) {
            _this.memberCache.set(Object.values(userParams).join('-'), response);
            return response;
        }));
    };
    MemberService.prototype.getMember = function (username) {
        var member = __spreadArrays(this.memberCache.values()).reduce(function (arr, elem) { return arr.concat(elem.result); }, [])
            .find(function (member) { return member.username == username; });
        if (member)
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
    MemberService.prototype.addLike = function (username) {
        return this.http.post(this.baseUrl + 'likes/' + username, {});
    };
    MemberService.prototype.getLikes = function (predicate, pageNumber, pageSize) {
        var params = paginationHelper_1.getPaginationHeaders(pageNumber, pageSize);
        params = params.append("predicate", predicate);
        return paginationHelper_1.getPaginationResult(this.baseUrl + 'likes', params, this.http);
    };
    MemberService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MemberService);
    return MemberService;
}());
exports.MemberService = MemberService;
