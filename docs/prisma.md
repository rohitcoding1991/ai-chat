`npm install -D prisma`

`npm install @prisma/client @auth/prisma-adapter`


#### Push model changes to database
- Generate the prisma methods to node modules
`npx prisma generate` - Required to hit when you do fresh `npm install`

- Push changes to database
`npx prisma db push`

- `npm run prisma-migrate` is required when prisma modal is changed, to be able to write downt the commands for altering db.

