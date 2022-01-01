# To do app

🏠Hosted in heroku 
- API (Swagger): https://todo-group-api.herokuapp.com/swagger/
- APP: https://todo-group-app.herokuapp.com

⚙️Deploying at heroku

Web:
- Adding remote
```
heroku git:remote --remote heroku-web -a <heroku-web-project-name>
```
- Pushing
``` 
git subtree push --prefix web heroku-web master
``` 

API:
- Adding remote
```
heroku git:remote --remote heroku-backend -a <heroku-api-project-name>
```
- Pushing
```
git subtree push --prefix backend heroku-backend master
or
git push heroku-backend `git subtree split --prefix backend master`:master --force
```

📖Things yet to do
- [ ] Frontend - Persist login
- [ ] Frontend - Task groups and tasks (Pages)
- [ ] Backend - Set nickname as unique
- [ ] Backend - Solve ssl at heroku
