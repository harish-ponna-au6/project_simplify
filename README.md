# Simplify

### Deployed URL: [simplify-2021.herokuapp.com](https://simplify-2021.herokuapp.com/)


<br/>
<br/>

* Simplify is a web application that provides easy tracking and maintainance of orders given to Graphic Editors given by their clients. It is like a small market in single application. Every single client will get multiple choices of editors. Every editor will have single platform to flaunt their experties and quality at competetive price to their customers.

* Simplify is a React web application. This app is helpful in digitalizing photographers and editors routine billing from paper to computer. Razorpay payment gateway is used on signup. OTP Confirmation through email for resetting password. The main goal of this application is to help users to analyse/track their monthly business, received orders, income etc.

* The main aim of this project is to simplify orders management of any bussiness shops or offices where regular clients visits them to some works. In this project we have taken Editor or Graphic designers who take work from client to edit graphics for their photos and videos.

* In this project NodeJs ,ExpressJs, MongoDB is used to create the backend server. This backend server mainly acts as api. For frontend we have used ReactJS (A library of javascript).

* In this repo package.json has all the neccessary packages that are needed to run the server.

    - To start the backend api server run the npm command:- npm start
    - To start the frontend React server cd to /src/client and run the npm command:- npm start

# Technologies Used:

#### Backend

    - NodeJS
    - ExpressJS
    - Mongoose(MongoDB)
    - Json Web Tokens (JWT authentication)
    - BrcryptJs (Hashing passwords)
    - Nodemailer (to send OTP)
    - RazorPay (Payment Gateway)
    - Hapi/Joi (Validations)

#### Frontend

    - ReactJS
    - Redux
    - React Query
    - Framer Motion
    - Axios

### Types of users to this Application are:

    1. Administrator
    2. Editors
    3. Clients

### Administrator's Functionalities

* Administrator has rights over Editors. He can activate account of editors. He can Block and Unblock editor's account.

### Editor's Functionalities

* Editor has right over his clients. He can create account for clients. He can remove client. he can create orders for clients and view them according to categories and can search the orders and clients. Editor have pay to administrator through Razorpay payment gateway, to get their account activated.

### Client's Functionalities

* Client can keep track on their orders and searh their orders.

