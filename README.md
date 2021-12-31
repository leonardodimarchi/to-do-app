# To do app

🏠Hosted in heroku 
- API (Swagger): https://todo-group-api.herokuapp.com/swagger/
- APP: https://todo-group-app.herokuapp.com/user-tasks

⚙️Deploying at heroku

At master branch:
``` 
heroku git:remote --remote heroku-web -a <heroku-web-project-name>
heroku git:remote --remote heroku-backend -a <heroku-api-project-name>
```

``` 
git subtree push --prefix web heroku-web master
git subtree push --prefix backend heroku-backend master
```

📖Things yet to do
- [ ] Frontend - Persist login
- [ ] Frontend - Task groups and tasks (Pages)
- [ ] Backend - Set nickname as unique
