
#!/bin/sh -e

psql --variable=ON_ERROR_STOP=1 --username "chicago" <<-EOSQL
    CREATE ROLE chicago WITH LOGIN PASSWORD 'password';
    CREATE DATABASE "sokobandb" OWNER = chicago;
    GRANT ALL PRIVILEGES ON DATABASE "sokobandb" TO chicago;
EOSQL