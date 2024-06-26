## API Documentation Introduction
- Welcome to the API documentation for our application! This document provides detailed information on the endpoints available in our backend system, outlining how to interact with each endpoint effectively.

## Authentication and Authorization

- Our API uses token-based authentication for most endpoints. Endpoints requiring administrative access are restricted and require an admin token for authorization. Make sure to include the token in the header of your requests where specified.

### Base URL :https://rbac-backend-dxeh.onrender.com/registeruser

## Endpoints

### User Management:

- POST /registeruser: Register a new user.
- POST /login: Authenticate user login.
- POST /googleauth: Authenticate user using Google OAuth.
- POST /forgot-password: Initiate password reset.
- POST /reset-password/:id/:token: Reset user password.
- PUT /updateprofile/:id: Update user profile information (requires token).

### Admin Operations:
- GET /getallusers: Get all users (requires admin access).
- PUT /updaterole: Update user role (requires admin access).
- GET /getuserbyid/:id: Get user details by ID (requires admin access).

### User Task Management:
- POST /create-task/:id: Create a task for a user (requires admin access).
- GET /getalltask: Get all tasks (requires admin access).
- GET /getusertask/:id: Get tasks assigned to a specific user.

### Task Status Update:
- PUT /update-status/:userID/:taskID: Update task status.

### User Search:
- GET /search/username: Search for users by username.

## Error Handling
- Our API returns appropriate HTTP status codes along with JSON error messages for each request. Please refer to the response codes section in each endpoint description for details on possible errors and their meanings.

## API Documentation Link: