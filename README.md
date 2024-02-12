# Note Naja

my credit code reference:
  - redux toolkit authentication: https://blog.stackademic.com/manage-your-react-typescript-application-state-using-redux-toolkit-926d3b4abaa7
  - redux toolkit section and dispatch: https://redux.js.org/tutorials/essentials/part-5-async-logic
  - google auth: https://medium.com/@dhananjay_71533/implementing-google-authentication-with-react-js-and-node-js-f72e306f26c9
  - and **chatGPT** help me to solve the problem: https://chat.openai.com/room/0P9

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
![image](https://scontent.fbkk14-1.fna.fbcdn.net/v/t1.15752-9/423454570_1071095227342515_8431796865996278279_n.png?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeFG7IyP3fY41N5jPbH_8B7ZcxTUsWOXathzFNSxY5dq2AZRgm7d6nkW_BF-Sr3eQgfIASPcecmUcJ7Wm9HUueyk&_nc_ohc=fDSqnpbnPWoAX-EXBG7&_nc_ht=scontent.fbkk14-1.fna&oh=03_AdS9f5ZTGx3RL7Jus4vlQn6P4lnvsGj2T5CID2369_Nt3g&oe=65F1BB1B)
