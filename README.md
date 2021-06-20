# NodeJS-Address-book-API

 ### A small project that uses NodeJS, Express, and serverless to create an API for an address book That runs off of AWS Lambda. The database will containing user information like: Name, Company, Address, Phone Number, Email Address, Notes.

# Dependencies
- NodeJS
  - Express
  - cors
  - serverless-http
  - serverless-dotenv-plugin
  - mysql
  - dotenv
  - Serverless

# Setup
### Create a mysql database and plug the needed information into the .env file example below.
```
RDS_HOSTNAME=XXXX
RDS_PORT=XXXX
RDS_USERNAME=XXXX
RDS_PASSWORD=XXXX
RDS_DATABASE=XXXX
```
Then install the needed Dependencies stated in [Dependencies](#Dependencies)
### Command to install all dependencies:
```console
npm i --save-dev express cors serverless-http sererless-dotenv-plugin mysql dotenv serverless
```
Once installing the needed dependencies configure your AWS credentials for serverless with the command below
```console
serverless config credentials --provider aws --key XXXXXXXXXXXX --secret XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
# Usage
After following the setup, deploying the address book to lambda is as simple as the below command.
```console
serverless deploy
```

Enjoy :P
