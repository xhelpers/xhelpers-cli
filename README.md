
```
           _ _                                                 _           
 __  _____| (_)   ___ ___  _ __ ___  _ __ ___   __ _ _ __   __| | ___ _ __ 
 \ \/ / __| | |  / __/ _ \| '_ ` _ \| '_ ` _ \ / _` | '_ \ / _` |/ _ \ '__|
  >  < (__| | | | (_| (_) | | | | | | | | | | | (_| | | | | (_| |  __/ |   
 /_/\_\___|_|_|  \___\___/|_| |_| |_|_| |_| |_|\__,_|_| |_|\__,_|\___|_|   
                                                                           

 A simple CLI tool to create and manage xhelpers-api projects ;) 

```                                                     

## Install

```
git clone https://github.com/xhelpers/xhelpers-cli.git
npm i -g ./
```

```
Usage: xcli|v [options] [command]

xcli commander

Options:
  --debug              include debugging information, such as stack dump
  -h, --help           display help for command
  -V, --version        output the version number

Commands:
  help [command]       display help for command
  clone|c [options]    Start a new project by cloning a git repository  
  inspect|i [options]  Inspect current folder looking for (xhelpers-api) settings
  touch|t [options]    Create a new path with set of touched files
```


## Inspect

```
xcli i
```

```
Running 'inspect' on path: 'PlataformaAccount'

✅  Current folder has xhelpers-api components

         API - Accounts - version: 1.0.0
🌲  xhelpers-api: ^2.1.20
🌲  typescript: ^3.6.2

🔢  Server xhelpers-api settings
┌─────────┬─────────────┬────────────┬─────────┐
│ (index) │    name     │    type    │ enabled │
├─────────┼─────────────┼────────────┼─────────┤
│    0    │ 'Sequelize' │ 'Database' │  true   │
│    1    │ 'Mongoose'  │ 'Database' │  false  │
│    2    │    'JWT'    │   'Auth'   │  true   │
│    3    │  'APP_KEY'  │   'Auth'   │  false  │
│    4    │    'SSO'    │   'Auth'   │  true   │
│    5    │  'Sentry'   │   'Logs'   │  false  │
└─────────┴─────────────┴────────────┴─────────┘

🔢  Components xhelpers-api
┌─────────┬───────────────────────────┬─────────────┬───────┐
│ (index) │           name            │    type     │ count │
├─────────┼───────────────────────────┼─────────────┼───────┤
│    0    │    'account.route.ts'     │   'Route'   │   9   │
│    1    │      'auth.route.ts'      │   'Route'   │   2   │
│    2    │   'account.service.ts'    │  'Service'  │   0   │
│    3    │     'auth.service.ts'     │  'Service'  │   0   │
│    4    │  'fileUpload.service.ts'  │  'Service'  │   0   │
│    5    │   'mailman.service.ts'    │  'Service'  │   0   │
│    6    │ 'token.issuer.service.ts' │  'Service'  │   0   │
│    7    │    'account.model.ts'     │   'Model'   │   0   │
│    8    │  'actionToken.model.ts'   │   'Model'   │   0   │
│    9    │     'deployment.yaml'     │ 'Manifest'  │   0   │
│   10    │     'app_homolog.yml'     │ 'GitAction' │   0   │
│   11    │     'app_master.yml'      │ 'GitAction' │   0   │
└─────────┴───────────────────────────┴─────────────┴───────┘
Current folder is already a Git repository!
```

## Clone

```
xcli c
```

```
? Inform project path: todo-sample
? Select template to clone: Sample todo api
  Integration using default jwt (JSON Web Token) 
  Integration using jws (JSON Web Signature) 
  Integration using oauth2 
  Integration using oauth + https 
  Integration using soap 
  Template mailman sendgrid 
  Template default account-sql 
❯ Sample todo api 
  Sample fileupload 
  Sample video streaming api 
  Sample websocket 
  Sample websocket using redis 
  Sample mailman 
  Sample account 
(Move up and down to reveal more choices)
🔃  Copying files... Sample todo api https://github.com/xhelpers/xhelpers-todo-sample.git
🔃  Sample todo api https://github.com/xhelpers/xhelpers-todo-sample.git
✅  The files have been copied!
✅  Repository cloned todo-sample
```

