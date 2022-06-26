/**
 * ONE TIME for system
 * 1. create heroku account
 * 2. Verify email
 * 3. Install heroku CLI
 * 4. open command heroku login
 * -----------------------------
 * One time for each project
 * 1. heroku create
 * 2. make sure git add . -> git commit -m "comment" -> git push
 * 3. git push heroku main
 * https://ancient-citadel-53678.herokuapp.com/
 * 
 * 4. Go to heroku dashboard > current project > settings > reveal config vars
 * 5. copy paste config vars from your .env file
 * 6. Make sure you have whitelisted all ip address to access mongodb
 * -----------------
 * Update server with new changes
 * -----------------
 * 1. Make Changes
 * 2. make sure git add . -> git commit -m "comment" -> git push
 * 3. git push heroku main
 * ------------------
 * connect server with client and deploy client
 * ------------------
 * 1. Replace localhost by heroku link
 * 2. npm run build
 * 3. firebase deploy
 * website is https://genius-car-frontend.web.app/
 */