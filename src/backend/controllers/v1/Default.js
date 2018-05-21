"use strict";

var utils = require("../../utils/writer");
var Default = require("../../service/DefaultService");

module.exports.availability = function availability(req, res, next) {
  var from = req.swagger.params["from"].value;
  var to = req.swagger.params["to"].value;
  var node = req.swagger.params["node"].value;
  Default.availability(from, to, node)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.cpu = function cpu(req, res, next) {
  var from = req.swagger.params["from"].value;
  var to = req.swagger.params["to"].value;
  var node = req.swagger.params["node"].value;
  Default.cpu(from, to, node)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.disk = function disk(req, res, next) {
  var from = req.swagger.params["from"].value;
  var to = req.swagger.params["to"].value;
  Default.disk(from, to)
    .then(function(response) {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.memoryRam = function memoryRam(req, res, next) {
  var from = req.swagger.params["from"].value;
  var to = req.swagger.params["to"].value;
  var node = req.swagger.params["node"].value;
  Default.memoryRam(from, to, node)
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};

module.exports.getNodesOfKubernetes = function memoryRam(req, res, next) {
  Default.getNodesOfKubernetes()
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(function(response) {
      utils.writeJson(res, response);
    });
};
