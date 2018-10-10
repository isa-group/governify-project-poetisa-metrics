'use strict';

var utils = require('../../utils/writer');
var DefaultV2 = require('../../service/DefaultV2Servicev2');

module.exports.avgAvailability = function avgAvailability(req, res, next) {
    var from = req.swagger.params['from'].value;
    var to = req.swagger.params['to'].value;
    var node = req.swagger.params['node'].value;
    var namespace = req.swagger.params['namespace'].value;
    var pod_name = req.swagger.params['pod_name'].value;
    DefaultV2.avgAvailability(from, to, node, namespace, pod_name)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.cpuLoad = function cpu(req, res, next) {
    var from = req.swagger.params['from'].value;
    var to = req.swagger.params['to'].value;
    var node = req.swagger.params['node'].value;
    var namespace = req.swagger.params['namespace'].value;
    var pod_name = req.swagger.params['pod_name'].value;
    DefaultV2.cpu(from, to, node, namespace, pod_name)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.diskSpace = function disk(req, res, next) {
    var from = req.swagger.params['from'].value;
    var to = req.swagger.params['to'].value;
    var node = req.swagger.params['node'].value;
    var namespace = req.swagger.params['namespace'].value;
    var pod_name = req.swagger.params['pod_name'].value;
    DefaultV2.disk(from, to)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.avgMemoryRam = function memoryRam(req, res, next) {
    var from = req.swagger.params['from'].value;
    var to = req.swagger.params['to'].value;
    var node = req.swagger.params['node'].value;
    var namespace = req.swagger.params['namespace'].value;
    var pod_name = req.swagger.params['pod_name'].value;
    DefaultV2.memoryRam(from, to, node, namespace, pod_name)
        .then(response => {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.podNumber = function podNumber(req, res, next) {
    var from = req.swagger.params['from'].value;
    var to = req.swagger.params['to'].value;
    var node = req.swagger.params['node'].value;
    var namespace = req.swagger.params['namespace'].value;
    var pod_name = req.swagger.params['pod_name'].value;
    DefaultV2.podNumber(from, to, node, namespace, pod_name)
        .then(response => {
            utils.writeJson(res, response, node, namespace, pod_name);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};


module.exports.numberDays = function numberDays(req, res, next) {
    var from = req.swagger.params['from'].value;
    var to = req.swagger.params['to'].value;
    DefaultV2.numberDays(from, to)
        .then(response => {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};