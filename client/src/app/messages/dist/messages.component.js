"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessagesComponent = void 0;
var core_1 = require("@angular/core");
var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(messageService) {
        this.messageService = messageService;
        this.pageNumber = 1;
        this.pageSize = 5;
    }
    MessagesComponent.prototype.ngOnInit = function () {
        this.loadMessages();
    };
    MessagesComponent.prototype.loadMessages = function () {
        var _this = this;
        this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(function (response) {
            _this.messages = response.result;
            _this.pagination = response.pagiantion;
        });
    };
    MessagesComponent.prototype.pageChange = function (event) {
        this.pageNumber = event.page;
        this.loadMessages();
    };
    MessagesComponent = __decorate([
        core_1.Component({
            selector: 'app-messages',
            templateUrl: './messages.component.html',
            styleUrls: ['./messages.component.scss']
        })
    ], MessagesComponent);
    return MessagesComponent;
}());
exports.MessagesComponent = MessagesComponent;
