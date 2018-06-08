"use strict";

const request = require("request");
const moment = require("moment");

const config = require("../configurations");
const logger = require("../logger");

/**
 * Returns the availability at a given time
 *
 * from String from date
 * to String toal date
 * node String node of the system
 * no response value expected for this operation
 **/
exports.availability = function (from, to, node) {
  return new Promise(function (resolve, reject) {
    var fromDate = moment(from);
    var toDate = moment(to);
    var gap;
    var query;
    if (to) {
      if (from > to) {
        response = {
          res: 400,
          response: "from is bigger that end"
        };
        reject(response);
      } else {
        query =
          'select mean("value") from "uptime" where "type" = \'pod\' and time > \'' +
          from.toISOString() +
          "'";
        " and time <= '" + toDate.toISOString() + "'";
        if (node) {
          query = query + 'and "pod_name" =~ /^' + node + "/";
        }
        logger.info("query: " + query);
        gap = toDate.diff(toDate, "days") + 1;
      }
    } else {
      query =
        'select mean("value") from "uptime" where "type" = \'pod\' and time > \'' +
        from.toISOString() +
        "'";
      if (node) {
        query = query + 'and "pod_name" =~ /^' + node + "/";
      }
      logger.info("query: " + query);
      gap = toDate.diff(moment(), "days") + 1;
    }
    var response;
    request({
        method: "POST",
        url: config.data.apiInfluxdb,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        form: {
          q: query,
          db: "k8s"
        }
      },
      (err, res, body) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        if (body === '{"results":[{"statement_id":0}]}\n') {
          response = {
            res: res.statusCode,
            response: "Please check the parameters, as no information is found "
          };
        } else {
          logger.info(res.statusCode);
          logger.info(body);
          // is passed from milliseconds to days
          var timeUp = JSON.parse(body).results[0].series[0].values[0][1] / 3600000 / 24;
          response = {
            res: res.statusCode,
            response: {
              value: (timeUp / gap).toFixed(2),
              unit: '%'
            }
          };
        }
        resolve(response);
      }
    );
  });
};

/**
 * Returns a user based on a single ID, if the user does not have access to the pet
 *
 * from String from date
 * to String toal date
 * node String Average memory consumption of the node
 * no response value expected for this operation
 **/
exports.cpu = function (from, to, node) {
  return new Promise(function (resolve, reject) {
    var fromDate = moment(from);
    var toDate = moment(to);
    // var gap;
    var query;
    if (to) {
      if (from > to) {
        response = {
          res: 400,
          response: "from is bigger that end"
        };
        reject(response);
      } else {
        query =
          'select mean("value") from "cpu/usage_rate" where "type" = \'pod\' and time > \'' +
          from.toISOString() +
          "' and time <= '" + toDate.toISOString() + "'";
        if (node) {
          query = query + 'and "pod_name" =~ /^' + node + "/";
        }
        logger.info("query: " + query);
      }
    } else {
      query =
        'select mean("value") from "cpu/usage_rate" where "type" = \'pod\' and time > \'' +
        from.toISOString() +
        "'";
      if (node) {
        query = query + 'and "pod_name" =~ /^' + node + "/";
      }
      logger.info("query: " + query);
    }
    var response;
    request({
        method: "POST",
        url: config.data.apiInfluxdb,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        form: {
          q: query,
          db: "k8s"
        }
      },
      (err, res, body) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        if (body === '{"results":[{"statement_id":0}]}\n') {
          response = {
            res: res.statusCode,
            response: "Please check the parameters, as no information is found "
          };
        } else {
          logger.info(res.statusCode);
          logger.info(body);
          var usageCPU = JSON.parse(body).results[0].series[0].values[0][1];
          response = {
            res: res.statusCode,
            response: usageCPU.toFixed(2)
          };
        }
        resolve(response);
      }
    );
  });
};

/**
 * Returns a user based on a single ID, if the user does not have access to the pet
 *
 * from String from date
 * to String toal date
 * node String Occupied disk space on a node
 * no response value expected for this operation
 **/
exports.disk = function (from, to) {
  return new Promise(function (resolve, reject) {
    var fromDate = moment(from);
    var toDate = moment(to);
    // var memoryT = config.server.diskMemory;
    var query;
    if (to) {
      if (from > to) {
        response = {
          res: 400,
          response: "from is bigger that end"
        };
        reject(response);
      } else {
        query = 'select mean("value") from "memory/usage" where "type" = \'pod\'  and time > \'' + from.toISOString() + "'";
        " and time <= '" + toDate.toISOString() + "'";
        logger.info("query: " + query);
      }
    } else {
      query = 'select mean("value") from "memory/usage" where "type" = \'pod\' and time > \'' + from.toISOString() + "'";
      logger.info("query: " + query);
    }
    var response;
    request({
        method: "POST",
        url: config.data.apiInfluxdb,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        form: {
          q: query,
          db: "k8s"
        }
      },
      (err, res, body) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        if (body === '{"results":[{"statement_id":0}]}\n') {
          response = {
            res: res.statusCode,
            response: "Please check the parameters, as no information is found "
          };
        } else {
          logger.info(res.statusCode);
          logger.info(body);
          response = {
            res: res.statusCode,
            response: {
              value: (JSON.parse(body).results[0].series[0].values[0][1] * 1e-12).toFixed(2),
              measurementUnit: "TB"
            }
          };
        }
        resolve(response);
      }
    );
  });
};

/**
 * Returns a user based on a single ID, if the user does not have access to the pet
 *
 * from String from date
 * to String toal date
 * node String Average memory consumption of the node
 * no response value expected for this operation
 **/
exports.memoryRam = function (from, to, node) {
  return new Promise(function (resolve, reject) {
    var fromDate = moment(from);
    var toDate = moment(to);
    // var memoryT = config.server.ramMemory;
    var query;
    var gap;
    if (to) {
      if (from > to) {
        response = {
          res: 400,
          response: "from is bigger that end"
        };
        reject(response);
      } else {
        query =
          'select mean("value") from "memory/usage" where "type" = \'pod\' and time > \'' +
          from.toISOString() +
          "'" + " and time <= '" + toDate.toISOString() + "'";
        if (node) {
          query = query + 'and "pod_name" =~ /^' + node + "/";
        }
        logger.info("query: " + query);
        gap = toDate.diff(toDate, "days") + 1;
      }
    } else {
      query =
        'select mean("value") from "memory/usage" where "type" = \'pod\' and time > \'' +
        from.toISOString() +
        "'";
      if (node) {
        query = query + 'and "pod_name" =~ /^' + node + "/";
      }
      logger.info("query: " + query);
      gap = toDate.diff(moment(), "days") + 1;
    }
    var response;
    request({
        method: "POST",
        url: config.data.apiInfluxdb,
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        form: {
          q: query,
          db: "k8s"
        }
      },
      (err, res, body) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        if (body === '{"results":[{"statement_id":0}]}\n') {
          response = {
            res: res.statusCode,
            response: "Please check the parameters, as no information is found "
          };
        } else {
          logger.info(res.statusCode);
          logger.info(body);
          response = {
            res: res.statusCode,
            response: {
              value: (JSON.parse(body).results[0].series[0].values[0][1] * 1e-9).toFixed(2),
              measurementUnit: "GB"
            }
            // / memoryT) * 100).toFixed(2) + ' %'
          };
        }
        resolve(response);
      }
    );
  });
};

/**
 * Return a nodes in kubernetes
 */
exports.getNodesOfKubernetes = function () {
  return new Promise(function (resolve, reject) {
    var response;
    var url = config.data.apiKuberntes + "/namespaces/default/pods";
    request({
        method: "GET",
        url: url,
        json: true
      },
      (err, res, body) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        if (body === '{"results":[{"statement_id":0}]}\n') {
          response = {
            res: res.statusCode,
            response: "Please check the parameters, as no information is found "
          };
        } else {
          logger.info("body");
          logger.info(body);
          logger.info(res.statusCode);
          logger.info(body.items.length);
          var names = body.items.map(x => {
            return x.metadata.name;
          });
          response = {
            res: res.statusCode,
            response: names
          };
        }
        resolve(response);
      }
    );
  });
};