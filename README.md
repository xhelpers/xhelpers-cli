# xhelpers-cli

```
       _          _                        ____ _     ___ 
 __  _| |__   ___| |_ __   ___ _ __ ___   / ___| |   |_ _|
 \ \/ / '_ \ / _ \ | '_ \ / _ \ '__/ __| | |   | |    | | 
  >  <| | | |  __/ | |_) |  __/ |  \__ \ | |___| |___ | | 
 /_/\_\_| |_|\___|_| .__/ \___|_|  |___/  \____|_____|___|
                   |_|                                    
A CLI tool to create and manage xhelpers projects ;) 
```                                                     

## Install

npm 
```
npm i -g xhelpers-cli
```

local
```
git clone https://github.com/xhelpers/xhelpers-cli.git
npm i -g ./
```

```
Usage: xc [options] [command]

Options:
  --debug                        include debugging information, such as stack dump
  -h, --help                     display help for command
  -V, --version                  output the version number

Commands:
  help [command]                 display help for command
  version|v                      display installed cli version
  clone|c [path] [templateName]  Start a new project by cloning a git repository
  			 path: dir name to be created
  			 templateName: template name[todo-sample, account-sample, mailman-sample]
  			 xcli c demo1 todo-sample  			 
  clonelist|cl                   Display clone templates  
  inspect|i [path]               Inspect path looking for (xhelpers-api) settings
  			 path: xhelpers project path			 
  			 xcli i demo1  			 
  touch|t [path] [context]       Create a new path with set of touched files
  			 path: dir name to be created
  			 context: context name[component, container, service, saga, screen]
  			 xcli t demo1 component  			 
  touchlist|tl                   Display touch templates
  
```

## Clone

```
  clone|c [path] [templateName]
  			 path: dir name to be created
  			 templateName: template name[todo-sample, account-sample, mailman-sample]
  			 
xc c
xc c demo1 todo-sample
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

## Inspect

```
inspect|i [path]           
  			 path: xhelpers project path			  			 

xc i
xc i demo1
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


## Touch

```
  touch|t [path] [context]
  			 path: dir name to be created
  			 context: context name[component, container, service, saga, screen]

xc t
xc t demo2 screen
xc t demo1/cp1 container
xc t demo1/cp1 component
xc t demo1/cp1 saga
xc t demo1/cp1 service
```
```
? Inform project path: demo1
? Select xhelpers-front type: (frontTemplate) (Use arrow keys)
❯ Component 
  Container 
  Service 
  Saga 
  Screen 

🔃  Touching files... Component
✅  The files have been copied!
🔃  Template url: https://raw.githubusercontent.com/xhelpers/xhelpers-front-snippets/main/index.ts
🔃  New File: demo1/index.ts
🔃  Template url: https://raw.githubusercontent.com/xhelpers/xhelpers-front-snippets/main/%7Bname%7D.component.tsx
🔃  New File: demo1/demo1.component.tsx
```