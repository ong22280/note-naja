FROM node:20

WORKDIR /usr/src/app

# RUN npm install

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm install next react react-dom

# RUN npm run build

# CMD ["npm", "run", "start"]

CMD ["npm", "run", "dev"]
# CMD ["npm", "run", "production"]