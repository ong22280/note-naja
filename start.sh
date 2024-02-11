#!/bin/bash

# get the current directory
r=`pwd`
echo We are here: $r

# Start the first process
echo "Start running the docker container"
docker-compose up -d

# Start the second process
echo "Start running the node server"
cd $r/backend
npm install
# npm run build
# npx prisma migrate dev
# npm run start
npm run dev &

# Start the third process
echo "Start running the react app"
cd $r/frontend
npm install
# npm run build
# npm start
npm run dev &
