"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberListComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var userParams_1 = require("src/app/_models/userParams");
var MemberListComponent = /** @class */ (function () {
    function MemberListComponent(memberService, accountService) {
        var _this = this;
        this.memberService = memberService;
        this.accountService = accountService;
        this.pageNumber = 1;
        this.pageSize = 5;
        this.accountService.currentUser$.pipe(operators_1.take(1)).subscribe(function (user) {
            _this.user = user;
            _this.userParams = new userParams_1.UserParams(user);
        });
    }
    MemberListComponent.prototype.ngOnInit = function () {
        this.loadMembers();
    };
    MemberListComponent.prototype.loadMembers = function () {
        var _this = this;
        this.memberService.getMembers(this.userParams).subscribe(function (response) {
            _this.members = response.result;
            _this.pagination = response.pagiantion;
        });
    };
    MemberListComponent.prototype.pageChanged = function (event) {
        this.userParams.pageNumber = event.page;
        this.loadMembers();
    };
    MemberListComponent = __decorate([
        core_1.Component({
            selector: 'app-member-list',
            templateUrl: './member-list.component.html',
            styleUrls: ['./member-list.component.scss']
        })
    ], MemberListComponent);
    return MemberListComponent;
}());
exports.MemberListComponent = MemberListComponent;
