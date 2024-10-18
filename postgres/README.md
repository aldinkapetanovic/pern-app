```sh
docker build -t postgres .
```

```sh
docker run -d \
  --name postgres \
  --restart unless-stopped \
  -p 5434:5432 \
  postgres

```

```sh
docker run -d \
  --name postgres \
  --restart unless-stopped \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=perndb \
  -p 5434:5432 \
  -v ./init-db.sh:/docker-entrypoint-initdb.d/init-db.sh \
  postgres:17
```
