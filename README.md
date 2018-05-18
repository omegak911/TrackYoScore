//Primary goals


App tech requirements: 
- SSL
- AWS
- Nginx
- JWT
- Passport
- Sessions
- SASS/SCSS
- React
- React Router
- React Redux
- MySQL
- Sequelize
- Workers
- possible (redis - store daily/weekly/monthly/all-time leaderboard data, mongoDB)


Users should be able to:
- create protected accounts
- maintain personal profile
- view overall and game specific score history
- level up
- Enter scores that do not finalize until other parties confirm
- play minigames on web app, solo & multiplayer that provides less exp


Friends:
- make friends + unfriend
- see friends online
- message friends
- filter leaderboard for just friends
- search for friends by username
- allow users to see profile regardless of friendship


Leveling system:
- points for both winning and losing
- icons and title available for various levels
- increasing exp needed for increasing levels
- perks for higher levels


Scoreboard:
- only allows adding scores
- have leaderboard that shows daily/weekly/monthly/all-time top players (require worker)
- pics for games


Minigames: (hard requirement - use sockets to achieve all players on same page)
- whack a mole - 4
- flappybird - 2
- pokeball finder - 6
- blackjack - 4
- monster fight - 6 (damage declares winner)


Perks:
- Upon submitting loss, % chance to allow redo
- EXP boost for a specified period of time
- 





Functionality:
when a score is entered, 
- it is added to the confirmation table
- each player will have an individual entry in the confirmation join table
- each player will search this table on login for notification
(might as well send this info to on login if we're touching it anyways)

when a score is validated
- it will find the associated confirmation table and update scoresValidated + subtract 1
- if validation = 0, it will add the score to history table
- each player will have an individual entry in the user_history join table
- onclick history, we would search the join table for related histories

Leveling system
Level   EXP increment per level
2-10    100 starting at 200
11-20   200
21-30   400
31-40   600
41-50   800
51-60   1200
61-70   1600
71-80   2000
81-90   2400
91-100  2800


have a worker that runs every week on confirmation and removes any > 1 week pending


Auth goals
- rate limiting (prevent more than 3 tries in the last hour)
- OAuth (via google, facebook, etc)
- OAuth with email confirmation
- requiring security questions on password reset
- expiring tokens/sessions
- secure + encrypted data
