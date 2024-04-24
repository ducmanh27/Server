### HOW TO RUN WEB APPLICATION

#### Run Application
- Navigate to the directory .../server
- Run the following commands:
    ```bash
    cd .\backend\Year3_dev_Backend\main\Year3\
    chmod +x .\entrypoint.sh
    sudo docker compose up -d --build
    ```

#### Backup Database
- Navigate to the directory .../server
- Copy the backup file `backup_db.sql` to the `database` container:
    ```bash
    sudo docker cp ./backup_db.sql database:/tmp/backup_db.sql
    ```
- Access the shell of the `database` container:
    ```bash
    sudo docker exec -it database bash
    ```
- Access the PostgreSQL command line interface:
    ```bash
    psql -U year3 -d smartfarm
    ```
- Execute the following commands in the PostgreSQL shell:
    ```sql
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
    exit
    ```
- Change directory to `/tmp`:
    ```bash
    cd tmp
    ```
- Restore the database from the backup file:
    ```bash
    psql -U year3 -d smartfarm -f backup_db.sql
    ```
