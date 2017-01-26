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
* Set up environment variables
  * create a .env file in the server folder with the following properties:
  * CLIENT_ID=//e.g MYCLIENTID122r13f1
  * APP_ACCESS_TOKEN=//e.g MYCLIENTID123|MYAXXTOKEN456
  * CLIENT_SECRET=//e.g. abc123456
  * NODE_ENV=//e.g development
  * DB_HOST=//e.g mongodb://127.0.0.1:27017/giftr
  * DB_USER=//optional
  * DB_PASS=//optional
  * create a .env.test file in the test folder with the following properties

## Mongo
* [Install MongoDB](https://www.evernote.com/shard/s557/nl/2147483647/d3d477c4-fa9c-43de-8167-86eac44c801b/)

## Misc
* [Trello](https://trello.com/b/kOwrKDAC/giftr)

## Potential non-cross platform components
* CreateFriendForm -> Modal (react-native)
* Swipeout
* View (in FbLoggiedInImageBar)
