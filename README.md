\copy (SELECT * FROM api_actuatormonitor) TO '/home/ipac/Documents/smart_construction/database/actuatormonitor.csv' DELIMITER ',' CSV HEADER;
\copy (SELECT * FROM api_rawsensormonitor) TO '/home/ipac/Documents/smart_construction/database/rawsensormonitor.csv' DELIMITER ',' CSV HEADER;
\copy (SELECT * FROM api_aqiref) TO '/home/ipac/Documents/smart_construction/database/aqiref.csv' DELIMITER ',' CSV HEADER;
\copy (SELECT * FROM api_energydata ) TO '/home/ipac/Documents/smart_construction/database/energydata.csv' DELIMITER ',' CSV HEADER;
\copy (SELECT * FROM api_registration ) TO '/home/ipac/Documents/smart_construction/database/registration.csv' DELIMITER ',' CSV HEADER;
\copy (SELECT * FROM api_room ) TO '/home/ipac/Documents/smart_construction/database/room.csv' DELIMITER ',' CSV HEADER;
