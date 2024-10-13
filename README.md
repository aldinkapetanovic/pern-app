```sql
CREATE DATABASE perndb;

\c perndb

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
```