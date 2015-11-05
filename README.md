DevOps HW3 - Proxies, Queues, Cache Fluency.
=========================
Based on [Workshop: Queues, Caches, Proxies](https://github.com/CSC-DevOps/Queues) and [Workshop: Deployment](https://github.com/CSC-DevOps/Deployment)

###Demo
[video](https://drive.google.com/file/d/0B87f7178bIHnNDF6NFVHeEZ6M0k/view?usp=sharing)

### Setup

* Clone this repo, run `npm install`.
* Install redis and run on localhost:6379

Run server instances by command

	node proxy.js
	
It will launch two servers from `main.js` and `main2.js`, on port `9090` and `5060`, and start a proxy server listen on port `8080`
