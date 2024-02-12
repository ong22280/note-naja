# Note Naja

credit code reference:
  - redux toolkit authentication: https://blog.stackademic.com/manage-your-react-typescript-application-state-using-redux-toolkit-926d3b4abaa7
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
![alt text](https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.15752-9/423036262_363764159776234_4225413238550704353_n.png?_nc_cat=105&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeEjZ2Y90Cbj5MlRCqXyjnKuZZBWsQQZo5FlkFaxBBmjkWKCnMLKCue7oEE76hmV7_vh06JLHiVaalCcFEwOEo_j&_nc_ohc=8h6XR5KaHGgAX_7jOT_&_nc_ht=scontent.fbkk10-1.fna&oh=03_AdQn7qsxDrGuhtfexK_rrOn-ryn_M7TEUAWwgT3N13GBjw&oe=65F1AA45)
