// "use strict";

const Cluster = require("ioredis").Cluster;
//const redis = Redis();
const cluster = new Cluster([
	{ port: 7000, host: "localhost" },
	{ port: 7001, host: "localhost" },
	{ port: 7002, host: "localhost" },
	{ port: 7003, host: "localhost" },
	{ port: 7004, host: "localhost" },
	{ port: 7005, host: "localhost" }
], {
	scaleReads: 'slave'
});

cluster.set('foo', 'bar'); // This query will be sent to one of the masters.
cluster.get('foo', function (err, res) {
  console.log(res);
});

cluster.set('foo', 'bar'); // This query will be sent to one of the masters.
cluster.get('foo', function (err, res) {
  console.log(res);
});

cluster.set('hello', 'heelo'); // This query will be sent to one of the masters.
cluster.get('hello', function (err, res) {
  console.log(res);
});

cluster.set('zello', 'zello'); // This query will be sent to one of the masters.
cluster.get('zello', function (err, res) {
  console.log(res);
});