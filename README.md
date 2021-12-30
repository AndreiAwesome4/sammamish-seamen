# Instructions

* Build

```bash
npm run build
```

* Run locally:

```bash
npm run serve
```

* Deploy from the local server:

```bash
docker-compose up -d
```
the site should be running from on http://67.168.147.58:8004/seamen.html

* Deploy to the public sever: work with your administrator to redeploy `ss-ag`.

* Configure your domain name. Create the following entry:
  * Type: `A`
  * Name: `@`
  * TTL: `3600`
  * Value: `40.122.25.89`