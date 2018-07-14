HOW TO USE THIS APP:

Required Tech:
- PostgreSQL
- yarn (optional)
- Webpack 3.11.0 (if you are using a different version, you may need to make some changes to webpack config)
- Cloudinary account (you'll need to create two presets, one for profile pics and one for game pics)

Instructions
1) git clone __repo link here__
2) cd __directory created__

(steps 3 and 4 creates and seeds about 14 million entries, so it's optional.  If you want pre-generated data, depending on your CPU, it should only take around 7/8 mins total)
3) npm run setup:createSeed --OR-- yarn setup:createSeed
  - note that createSeedData.jsx lines 17 and 123 generates random photo names that will probably not exist in your cloudinary image gallery.  It'll help to duplicate dummy photos in your two prsets beforehand.
4) npm run setup:seed --OR-- yarn setup:seed

5) rename example.config.js to config.js and fill in your cloudinary information
6) npm run build --OR-- yarn build
7) npm start --OR-- yarn start
8) if you like it, star this repo =)


Goal: To create a platform that allows players to track game scores with friends and a sense of achievement via leveling

Completed Features (MVP)
Login and security
- Persistent login
- Secured server routes (need to be logged in + cannot alter other user info)
- Hashed passwords
- Logout

Friends
- Request Friends
- Accept Friends
- Find other users

Submission
- Add a game 
- Submit scores

Profile
- see friends + stats

History
- Validate scores
- View Validated scores



Outstanding (MVP+)
- update account info
- additional css styling
- OAuth
- Deployment