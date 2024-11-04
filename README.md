# PERN-App

```sh
docker compose up -d
```

**minio**
https://github.com/minio/minio/blob/master/docs/orchestration/docker-compose/nginx.conf

```sh
podman run -p 9000:9000 -p 9001:9001 \
  quay.io/minio/minio server /data --console-address ":9001"
```

```sh
npm install minio
```
