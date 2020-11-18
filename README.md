# Data Warehouse Project

- Development for a marketing company to manage all the contacts of your customers and campaigns.
- Frontend and Backend with CRUD operations to database (datawarehouse).

# Requirements
- Node.js
- XAMPP, MySQL

# Instalation

## 1. Clone Project
Clone the repository from terminal:

- git clone https://github.com/lescobarc/dataProject.git 

Or download the repository and open the folder in your IDE:

- [https://github.com/lescobarc/dataProject.git](https://github.com/lescobarc/dataProject.git).

## 2. NodeJS
Install [NodeJS](https://nodejs.org/es/).

## 3. Database Server
Install and configure  [MYSQL](https://www.mysql.com/).

Install and configure [XAMMP](https://www.apachefriends.org/es/index.html) .

## 4. Create Database
- Open XAMPP and start Apache Web Server and MySQL Database in port `3306`.
- Open phpMyAdmin.
- Modify in the file `.env` (Folder: backend):  `dbUser`,  `password` with your local configuration.
- Create database: `datawarehouse`.
- Import script: `datawarehouse.sql` (Folder: backend) to create schema and parameters of database. 

## 5. Install Dependencies
In terminal (IDE) execute:

- npm install

## 6. Start Backend App 
In terminal (IDE) run ONE of the these commands in Backend Folder (cd Backend):

- node app.js  
- npm start
- nodemon app.js

## 7. App Ready
Message in terminal (IDE): 

'Server running on port 3000.  
Connection Database.'

## 8. Start Frontend
- Open file `1login.html` (Folder: frontend/html) with Live Server on Port: 5500.
- Enter Username and Password registered in database. 

## 9. Website
Browse the website where you can do CRUD operations in the sections of Contacts, Companies, Users (Administrative access) and Region/Country/City.


# Technologies & Resources:
-   Node.js
-   Nodemon
-   XAMPP
-   MySQL
-   Express
-   Sequelize 
-   Json Web Token 
-   Dotenv










