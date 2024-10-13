#!/bin/bash
set -e

# Create the database and table
psql -U postgres -d perndb << EOF
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);
EOF
