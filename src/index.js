"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var path_1 = require("path");
var fs = require("fs");
var typescript_parser_1 = require("typescript-parser");
var parser = new typescript_parser_1.TypescriptParser();
var buildRequest = function (type, resource, name, params) {
    var render = "  export type " + type + " = Controller<{\n";
    var declarations = resource.declarations, resources = resource.resources;
    var RequestBody = declarations.find(function (dec) { return dec.name === 'RequestBody'; });
    var response = resources.find(function (res) { return res.name === 'Responses'; });
    var $200 = null;
    if (response) {
        $200 = response.declarations.find(function (res) { return res.name === '$200'; });
    }
    if (RequestBody) {
        render += "    body: Paths." + name + "." + type + ".RequestBody;\n";
    }
    if ($200) {
        render += "    response: Paths." + name + "." + type + ".Responses.$200;\n";
    }
    if (params) {
        render += "    params: Paths." + name + ".PathParameters\n";
    }
    render += '  }>;\n';
    return render;
};
module.exports = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var program, resources, Paths, items, render;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, parser.parseFile(path_1.resolve(config.src), './')];
            case 1:
                program = _a.sent();
                resources = program.resources;
                Paths = resources.find(function (resource) { return resource.name === 'Paths'; });
                if (!Paths) {
                    return [2 /*return*/];
                }
                items = Paths.resources.map(function (path) {
                    var tmpPath = path;
                    var name = tmpPath.name;
                    var render = "export namespace " + name + "Controller {\n";
                    var Get = path.resources.find(function (resource) { return resource.name === 'Get'; });
                    var Post = path.resources.find(function (resource) { return resource.name === 'Post'; });
                    var Put = path.resources.find(function (resource) { return resource.name === 'Put'; });
                    var Delete = path.resources.find(function (resource) { return resource.name === 'Delete'; });
                    var Parameters = path.resources.some(function (resource) { return resource.name === 'Parameters'; });
                    if (Get) {
                        render += buildRequest('Get', Get, name, Parameters);
                    }
                    if (Post) {
                        render += buildRequest('Post', Post, name, Parameters);
                    }
                    if (Put) {
                        render += buildRequest('Put', Put, name, Parameters);
                    }
                    if (Delete) {
                        render += buildRequest('Delete', Delete, name, Parameters);
                    }
                    render += '}\n';
                    return render;
                });
                render = "/* eslint-disable @typescript-eslint/no-namespace */\n/* eslint-disable @typescript-eslint/no-explicit-any */\n// eslint-disable-next-line @typescript-eslint/no-unused-vars\n\nimport { Controller } from 'express-ts-generator';\n\n";
                render += items.join('');
                fs.writeFile(path_1.resolve(config.dist), render, function (err) {
                    console.log(err);
                });
                return [2 /*return*/];
        }
    });
}); };
