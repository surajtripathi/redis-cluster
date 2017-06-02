# Creating Redis cluster with 3 master and 3 slave configuration
### Following is the minimal configuration for each cluster node, just port number will change for each node.
we are going to use ports from 7000 to 7005.
```
port 7000
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
appendonly yes
```

## STEP#1. Creating 6 redis servers and running them on different ports
	**Create following folder structure**
	```
	mkdir cluster-test
	cd cluster-test
	mkdir 7000 7001 7002 7003 7004 7005
	```
	Now `cd` to each of folders from 7000 to 7005 and do the following things in each folder from 7000 to 7005.\
	1. In folder 7000, create file redis.conf with following content
		```
		port 7000
		cluster-enabled yes
		cluster-config-file nodes.conf
		cluster-node-timeout 5000
		appendonly yes
		```
		Run this command `redis-server ./redis.conf`
	1. In folder 7001, create file redis.conf with following content
		```
		port 7001
		cluster-enabled yes
		cluster-config-file nodes.conf
		cluster-node-timeout 5000
		appendonly yes
		```
		Run this command `redis-server ./redis.conf`
	1. In folder 7002, create file redis.conf with following content
		```
		port 7002
		cluster-enabled yes
		cluster-config-file nodes.conf
		cluster-node-timeout 5000
		appendonly yes
		```
		Run this command `redis-server ./redis.conf`
	1. In folder 7003, create file redis.conf with following content
		```
		port 7003
		cluster-enabled yes
		cluster-config-file nodes.conf
		cluster-node-timeout 5000
		appendonly yes
		```
		Run this command `redis-server ./redis.conf`
	1. In folder 7004, create file redis.conf with following content
		```
		port 7004
		cluster-enabled yes
		cluster-config-file nodes.conf
		cluster-node-timeout 5000
		appendonly yes
		```
		Run this command `redis-server ./redis.conf`
	1. In folder 7005, create file redis.conf with following content
		```
		port 7005
		cluster-enabled yes
		cluster-config-file nodes.conf
		cluster-node-timeout 5000
		appendonly yes
		```
		Run this command `redis-server ./redis.conf`

	Now all 6 redis servers are running.

## STEP#2. Creating the cluster

### To create cluster, we will use **redis-trib** utility
	1. which is you can download from **[here](https://github.com/antirez/redis/blob/unstable/src/redis-trib.rb)**
	1. You need to install redis gem to be able to run redis-trib.
		Run `gem install redis` to install.

	1. Now to create cluster run following command (make sure you set execute permission for **redis-trib.rb**)
		`./redis-trib.rb create --replicas 1 127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005`


Following is the node snippet to connect to cluster

```javascript
const Cluster = require("ioredis").Cluster;
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

```
