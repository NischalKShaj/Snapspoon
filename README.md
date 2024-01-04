# Secure Login System with CRUD Operations - README

## Project Overview

This project focuses on designing and implementing a secure login system with comprehensive CRUD operations, providing a seamless and secure user experience. The system includes user signup, login, and an intuitive home page. Admin functionalities allow for viewing, adding, editing, removing, and searching users. Secure user authentication is ensured through the use of JWT tokens, providing complete CRUD control for streamlined admin management.

## Stack

- **Node.js:** The project is built on the Node.js runtime for server-side JavaScript execution.
- **Express.js:** Express is used as the web application framework for building robust APIs and handling HTTP requests.
- **MongoDB:** MongoDB serves as the database for storing user information and login details.
- **EJS (Embedded JavaScript):** EJS is used for server-side templating to dynamically generate HTML content.
- **Token-Based Authentication:** The project leverages token-based authentication using JWT (JSON Web Tokens) for secure user login sessions.

## Features

1. **User Authentication:**
   - Secure user authentication is implemented using JWT tokens.
   - Users can sign up and log in securely.

2. **Comprehensive CRUD Operations:**
   - CRUD operations are seamlessly integrated for user management.
   - Admin functionalities include viewing, adding, editing, removing, and searching users.

3. **Efficient Session Management:**
   - The system ensures efficient session management for a smooth user experience.
   - Sessions are securely handled, providing a seamless login/logout process.

## Setup Instructions

To run the project locally, follow these steps:

1. **Clone the Repository:**
   ```
   git clone  https://github.com/NischalKShaj/Snapspoon.git

   ```

2. **Install Dependencies:**
   ```
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file based on the provided `.env.example`.
   - Set necessary environment variables such as MongoDB connection details and JWT secret.

4. **Run the Application:**
   ```
   npm start
   ```

5. **Access the Application:**
   - Open your web browser and navigate to `http://localhost:3000` or the specified port.

## Additional Notes

- Ensure that MongoDB is installed and running.
- Customize the EJS templates and stylesheets as needed for your application's design.


Feel free to contribute, report issues, or suggest improvements!
