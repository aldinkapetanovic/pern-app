# Use the official PostgreSQL image as a base
FROM postgres:17

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=perndb

# Copy the initialization script into the container
COPY ./init-db.sh /docker-entrypoint-initdb.d/init-db.sh

# Expose the PostgreSQL port
EXPOSE 5432
