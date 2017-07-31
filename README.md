## KeyDR

#### Play the game!
[https://keydr.herokuapp.com/](https://keydr.herokuapp.com/)

#### Overview
KeyDR is a musical game for one player. The user has to press the keys(D, F, J and K) that match the notes coming down the screen, similar to Dance Dance Revolution or Guitar Hero. If the player who succeeds in finishing the song makes it to the top 3 highest scores, their score gets recorded and shown when the game is over.

#### Technologies I used:

Ruby-on-Rails back-end with Postgresql database, HTML, CSS, JavaScript and jQuery used in the front-end.
( Ruby version 2.4.0 | Ruby on Rails version: 5.1.2 )

#### Installation
You can simply download the app, run `bundle install`, run the `rails server`, and then access to [http://localhost:3000](http://localhost:3000).

#### Link to my user stories, ERD(Entity Relationship Diagrams), and Milestones.
Here is the [Google Doc](https://docs.google.com/spreadsheets/d/1_IuCUMA9GzS1Uf2ccIaUCIwLwk-VfAWMDx5Zg5B4wsA/edit?usp=sharing).

#### Screenshots


#### Upcoming features
1. Upload song files to AWS for production release.
2. User loses points when notes are missed.
3. Hitting random keys leads to 10 points lose.
4. Improve the design on mobile.
5. Improve note pattern generation strategy. Currently, the generation logic is random and doesn't take into account the actual beats / melody of the song.
6. Add sound effects correct / incorrect keystrokes.
7. User can login with their Twitter or Facebook id and password (Omniauth).
