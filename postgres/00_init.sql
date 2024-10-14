-- Create a new user for replication
CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'replicator_password';

-- Create a replication slot
SELECT pg_create_physical_replication_slot('replication_slot');

-- Create a new table
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
