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
* Set up environment variables (see env-example.png)
  * create a .env file in the server folder with the following properties:
  * CLIENT_ID=//e.g MYCLIENTID122r13f1
  * APP_ACCESS_TOKEN=//e.g MYCLIENTID123|MYAXXTOKEN456
  * CLIENT_SECRET=//e.g. abc123456
  * NODE_ENV=development
  * DB_HOST=127.0.0.1:27017
  * DB_NAME=giftr
  * DEV_SSL_IS_ACTIVE=false // you need to generate
  * USES_AUTHENTICATION=false // if true, specify DB_USER and DB_PASS
  * DB_USER=//only if ^ is true
  * DB_PASS=//only if ^ is true
  * HTTP_PORT=//3000
  * HTTPS_PORT=//3001
  # Prod only
  * PROD_SSL_CERT_PATH=//
  * PROD_SSL_CA_PATH=//
  * PROD_SSL_PRIVKEY_PATH=//
  * create a .env.test file in the test folder with the following properties
* If `DEV_SSL_IS_ACTIVE=true`, generate a self-signed key)


 ```
*  pwgen 50 1 -s > passphrase
*  openssl genrsa -des3 -out ca.key 1024
*  openssl req -new -key ca.key -out ca.csr
*  openssl x509 -req -days 365 -in ca.csr -out ca.crt -signkey ca.key
*  openssl genrsa -des3 -out server.key 1024
*  openssl req -new -key server.key -out server.csr
*  cp server.key server.key.passphrase
*  openssl rsa -in server.key.passphrase -out server.key
*  openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```
## Mongo
* [Install MongoDB](https://www.evernote.com/shard/s557/nl/2147483647/d3d477c4-fa9c-43de-8167-86eac44c801b/)

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
