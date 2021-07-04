# Yore Score

## Description

_Duration: 2 Week Sprint_

YoreScore is a game tracking application based on Bingo, Bango, Bongo, a side-game played within a round of golf. Bingo, Bango, Bongo is a wager game that follows a sequence to award points to players: Bingo, Bango, Bongo, respectively. One game of Bingo, Bango, Bongo is based on nine holes of golf. The app requires one player to register/login and keep score for the foursome. The logged in user will be automatically assigned to Player 1. The logged in user (Player 1) sets up the game, to include whether the game begins on the front nine, or back nine, adding players, and awarding player points. Upon completion of a game, the app will provide a breakdown of each player and his/her respective payout. 

To see the fully functional site, please visit: [Yore-Score](https://yore-score.herokuapp.com/#/home)

## Screen Shot
[Landing Page](https://user-images.githubusercontent.com/44621153/124397318-cfa7f300-dcd4-11eb-9f7c-118f22a95d4b.png)

[Bingo, Bango, Bongo game board](https://user-images.githubusercontent.com/44621153/124397882-48f51500-dcd8-11eb-86df-45ff0247ff82.png)

[List of Previous Games](https://user-images.githubusercontent.com/44621153/124397373-10077100-dcd5-11eb-9f6e-db579f65ebea.png)


## Installation

The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries

1. Create a database named `your database name`
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly.
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!


## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Connects database to Heroku
```bash
heroku pg:psql --app yore-score < database.sql
```
Note on how to add an 'ON DELETE' constraint 
https://stackoverflow.com/questions/10356484/how-to-add-on-delete-cascade-constraints

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Built With
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

- [Node.js](https://nodejs.org/en/)
- [React.js] (https://reactjs.org/)
- [Postgresql] (https://www.postgresql.org/)

## Acknowledgement
Thanks to [Emerging Digital Academy](https://www.emergingacademy.org/) who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at [davidvinson018@gmail.com](www.google.com)
