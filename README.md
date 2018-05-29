# Proof of concept: node as microservice

First version of a simple node microservice.

### Requirements

PM2 installed

```sh
$ npm i pm2 -g
```

### Run

```sh
$ pm2 start ecosystem.config.yaml
```

### Monitoring

```sh
$ pm2 monit
```

### Detention

```sh
$ pm2 stop all
```

### Components

For this poc I use the following plugins & frameworks.

| Componente | Url |
| ------ | ------ |
| Express | https://expressjs.com/ |
| OracleDB | https://github.com/oracle/node-oracledb |
| Body Parser | https://www.npmjs.com/package/body-parser |
| Method Override | https://github.com/expressjs/method-override |
| PM2 | http://pm2.keymetrics.io/ |
| jsonwebtoken | https://github.com/auth0/node-jsonwebtoken |
| bcryptjs | https://www.npmjs.com/package/bcryptjs |
