# Note Naja

credit code reference:
  - redux toolkit authentication: https://www.youtube.com/watch?v=Kd5H6qf3y4Y
  - redux toolkit section and dispatch: https://redux.js.org/tutorials/essentials/part-5-async-logic
  - google auth: https://medium.com/@dhananjay_71533/implementing-google-authentication-with-react-js-and-node-js-f72e306f26c9
  - solve problem by: **chatGPT**

### 1. Clone Project
```bash
git clone https://github.com/ong22280/note-naja.git
```

### 2. Start Docker Container
```bash
docker-compose up -d
```

### 3. setup backend .env file with your own configuration
```bash
r=`pwd`
cd $r/backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run production
```

### 4. setup frontend .env file with your own configuration
```bash
cd $r/frontend
cp .env.example .env
npm install
npm run production
```

[demo](https://note-naja.sittipong.dev/) (start backend first)
![alt text](https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.15752-9/423036331_401356272301291_7024878083328651487_n.png?_nc_cat=106&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeEQYRAs34bW2MEXDqdx65Giyyv83Ir2U_vLK_zcivZT-yYvsQgYcZ5Uc6_iTnyReCC3HX89A6uRsRo6xxfr6z2t&_nc_ohc=8Ecu0HVHVZIAX90zWAg&_nc_ht=scontent.fbkk10-1.fna&oh=03_AdQnq0Uj647V3ocP4b_TRSZGSJ1-g2ii9OzyOsdjoHfpbA&oe=65F17C73)