# Banking Service - dummy bank application
The main goal of this web app is to provide a banking API service to users who want to integrate a dummy bank into their finance applications. Initially, this project was going to be only a backend service providing APIs, but then I decided to build the frontend too. <br/>
[Frontend Link](https://banking-service.vercel.app/) 
[Backend Link](https://banking-service-api.vercel.app/) 


## Technologies Used
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)


## Table of contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)

## Features
- User Authentication (Login, Register)
- Add Money to Account
- Transfer Money Between Accounts
- View Transaction History
- View user account balance


## Screenshots
![Screenshot 2024-06-14 224220](https://github.com/Soham908/Banking-Service/assets/111056496/eb547cc7-f42f-41f8-b0b1-06349493620a)

![Screenshot 2024-06-14 224925](https://github.com/Soham908/Banking-Service/assets/111056496/c9e7b6c9-0c96-4efa-9e81-595067cea7af)

![Screenshot 2024-06-14 224938](https://github.com/Soham908/Banking-Service/assets/111056496/67ca97b7-1c4b-441a-81ac-9eb49a24a8e6)

## Getting started

### Prerequisites
- Node.js
- Ensure you have [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) set up. Obtain your connection string.



### Installation

You can directly run container of this application using this docker image which is available publicly on dockerhub


1. Clone the repo:
   ```sh
   git clone https://github.com/yourusername/banking-service.git
   ```
2. Install NPM packages for backend:
   ```sh
   cd backend
   npm install
   ```
3. Install NPM packages for frontend:
   ```sh
   cd backend
   npm install
   ```

### Running the app

1. Start the backend server
   ```sh
   cd backend
   npm start
   ```
2. Start the frontend server
   ```sh
   cd frontend
   npm start
   ```
   


## API Documentation

This section provides detailed documentation for the API endpoints available in this project. The API is divided into two main sections: `/userAuth` and `/userMoney`.
The API documentation currently is sort of outdated, will change and add all the additional routes that were created. Some api routes response data was also changed.
Will post the entire API documentation of the base path of the api link possibly.

### `/userAuth` Endpoints

#### Register New User

- **Endpoint:** `/userAuth/register-new`
- **Method:** `POST`
- **Description:** Creates a new user in the MongoDB database and returns the user object.
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response:** The whole user object is returned

#### Login user

- **Endpoint:** `/userAuth/login`
- **Method:** `POST`
- **Description:** Login for the user, required for using in the frontend.
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response:** The whole user object is returned


### '/userMoney' Endpoints

#### Get User Balance
- **Endpoint:** /userMoney/balance/:username
- **Method:** GET
- **Description:** Retrieves the balance amount for the specified user.
- **URL Parameters:** username (string): The username of the user.
- **Response:**
  ```json
  {
  "balance": 1000
  }
  ```

#### Add Money to User Account
- **Endpoint**: /userMoney/addMoney
- **Method:** POST
- **Description:** Adds money to the user's account and returns the updated balance and transaction details.
- **Request Body:**
  ```json

  {
    "username": "your_username",
    "amount": 100,
    "description": "Deposit"
  }
  ```
- **Response:**
  ```json

  {
    "balance": 1100,
    "transaction": {
      "amount": 100,
      "description": "Deposit",
      "transactionType": "Debit"
    }
  }
  ```

#### Transfer Money from User Account
- **Endpoint:** /userMoney/transferMoney
- **Method:** POST
- **Description:** Credits or debits money from the user's account and returns the updated balance and transaction details.
- **Request Body:**
  ```json
  {
    "username": "your_username",
    "amount": 50,
    "description": "Transfer"
  }
  ```
- **Response:- **
  ```json
  {
    "balance": 1050,
    "transaction": {
      "amount": 50,
      "description": "Transfer",
      "transactionType": "Credit"
    }
  }
  ```
  
#### Get Transaction History
- **Endpoint:** /userMoney/transaction-history/:username
- **Method:** GET
- **Description:** Retrieves the transaction history for the specified user.
- **URL Parameters:** username (string): The username of the user.
- **Response:**
  ```json
  {
    "transactions": [
      {
        "amount": 100,
        "description": "Deposit",
        "transactionType": "Debit",
        "date": "2024-06-12T12:34:56.789Z"
      },
      {
        "amount": 50,
        "description": "Transfer",
        "transactionType": "Credit",
        "date": "2024-06-12T12:45:56.789Z"
      }
    ]
  }
  ```









