# Giftr: cloud-synced gift notepad.
![animated demo gif](demo.gif)
------
## Development Instructions
* make sure `mongodb` is installed
* `npm install`
* run mongo daemon
  * `mongod`
* seed data
	* `npm install -g node-mongo-seeds`
	* add collectionname.json to seeds folder
	* seed
* check `package.json` for commands

## Server
* rename `/server/.env.example` and `/server/test/.env.example` -> `.env`.
* Guide to env. variables:
  * create a .env file in the server folder with the following properties:
  * CLIENT_ID=//e.g MYCLIENTID122r13f1
  * APP_ACCESS_TOKEN=//e.g MYCLIENTID123|MYAXXTOKEN456
  * CLIENT_SECRET=//e.g. abc123456
  * NODE_ENV=//development or production
  * DB_HOST=//127.0.0.1:27017
  * DB_NAME=//giftr
  * DB_USER=//only if ^ is true
  * DB_PASS=//only if ^ is true
  * HTTP_PORT=//3000 only needed if the next item is blank
  * HTTPS_PORT=//3001
  * PROD_SSL_CERT_PATH=//e.g cert1.pem
  * PROD_SSL_CA_PATH=//e.g chain1.pem
  * PROD_SSL_PRIVKEY_PATH=// e.g privkey1.pem
## How to set up a key
  * `cd server && sh bootstrap.sh`

## Misc
* [Trello](https://trello.com/b/kOwrKDAC/giftr)

## Potential non-cross platform components
* CreateFriendForm -> `Modal` (react-native)
* `Swipeout`
* `DatePickerIOS`

 ## Generate Splash Screens / Icons
 * `npm install -g yo generator-rn-toolbox`
 * `yo rn-toolbox:assets --icon img/app_icon_blue.png`
 * `yo rn-toolbox:assets --splash img/splash.jpg`
