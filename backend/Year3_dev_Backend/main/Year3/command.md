# Year3_dev_Backend
Backend for year3
pip freeze  > requirement.txt
chmod +x ./entrypoint.sh

./manage.py startapp taskapp
# access to django project in container
docker exec -it smartfarm /bin/sh
# create network 
docker network create mynetwork
#  
docker run --name my-postgres -e POSTGRES_PASSWORD=year3 -d --network=psql_network postgres
# access to database in container
docker exec -it my-postgres bash

# build docker
docker-compose up -d --build