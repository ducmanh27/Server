.../server
cd /backend/Year3_dev_Backend/main/Year3
sudo chmod +x ./entrypoint.sh
sudo docker compose up -d --build
.../server
sudo docker cp ./backup_db.sql database:/tmp/backup_db.sql
sudo docker exec -it database bash
psql -U year3 -d smartfarm
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
exit
cd tmp
psql -U year3 -d smartfarm -f backup_db.sql