# E-commerce API Documentation

## Auth API

### Introduction

This document outlines the functionalities and usage of the Auth API for our E-commerce platform. This API handles user registration, login, and authentication processes.

### Authentication Methods

The Auth API utilizes a JWT (JSON Web Token) based authentication system.

### Endpoints

#### User Registration

**Endpoint:** `/ecomm/api/v1/auth/signup`

**Method:** POST

**Request Body:**

| Parameter | Description | Data Type | Required |
|---|---|---|---|
| name | User's full name | String | Yes |
| userId | Unique user identifier | String | Yes |
| email | User's email address | String | Yes |
| password | User's password | String | Yes |

**Response:**

* On successful registration:
    * Status Code: 201 (Created)
    * Response Body:
        * name: User's name
        * userId: User's unique identifier
        * email: User's email address
        * userType: "CUSTOMER" (default)

* On error:
    * Status Code: 400 (Bad Request) with a descriptive error message.
    * Possible error messages:
        * "Failed ! Please provide your name to register"
        * "Failed ! Please provide your email to register"
        * "Failed ! Please provide your userId to register"
        * "Failed ! User with the same userID already exits!"
        * "Failed ! User with the same name is already present"
        * "Failed! User with this email already exits"
        * "Error in the request" (for other unexpected errors)

#### User Login

**Endpoint:** `/ecomm/api/v1/auth/signin`

**Method:** POST

**Request Body:**

| Parameter | Description | Data Type | Required |
|---|---|---|---|
| userId | User's unique identifier | String | Yes |
| password | User's password | String | Yes |

**Response:**

* On successful login:
    * Status Code: 200 (OK)
    * Response Body:
        * name: User's name
        * userId: User's unique identifier
        * email: User's email address
        * userType: User's type (e.g., "CUSTOMER", "ADMIN")
        * accesstoken: JWT token used for further API requests requiring authentication.

* On error:
    * Status Code: 400 (Bad Request) with a descriptive error message.
    * Possible error messages:
        * "Please provide your userID"
        * "Please provide your password"
        * "UserID passed is not a valid one"
        * "Please check your password"

### Error Handling

The Auth API returns appropriate HTTP status codes and descriptive error messages to indicate any issues encountered during registration or login attempts. Refer to the Response section of each endpoint for specific error messages.

### Additional Notes

* All requests to the Auth API are expected in JSON format.
* The password is hashed before storing it in the database for security reasons.


Categories API
Introduction
This API provides endpoints for managing categories in an e-commerce application.

Endpoints
1. Create a New Category (Admin Only)
Endpoint: /ecomm/api/v1/categories

Method: POST

Authorization: Required (JWT token with Admin privileges)

Request Body:

Parameter	Description	Data Type	Required
name	Name of the category	String	Yes
description	Description of the category	String	Yes

Export to Sheets
Response:

On success:
Status Code: 201 (Created)
Response Body: The newly created category object.
On error:
Status Code: 400 (Bad Request) with a descriptive error message.
2. Get All Categories
Endpoint: /ecomm/api/v1/categories

Method: GET

Authorization: Not required

Response:

On success:
Status Code: 200 (OK)
Response Body: An array of category objects.
On error:
Status Code: 500 (Internal Server Error) with a descriptive error message.
3. Get a Category by ID
Endpoint: /ecomm/api/v1/categories/:id

Method: GET

Authorization: Not required

Path Parameter:

id: Unique identifier of the category
Response:

On success:
Status Code: 200 (OK)
Response Body: The category object with the specified ID.
On error:
Status Code: 404 (Not Found) with a descriptive error message.
4. Update a Category (Admin Only)
Endpoint: /ecomm/api/v1/categories/:id

Method: PUT

Authorization: Required (JWT token with Admin privileges)

Path Parameter:

id: Unique identifier of the category
Request Body:

Can include any or all of the following properties:
name: Updated category name
description: Updated category description
Response:

On success:
Status Code: 200 (OK)
Response Body: The updated category object.
On error:
Status Code: 400 (Bad Request) with a descriptive error message.
Status Code: 404 (Not Found)
5. Delete a Category (Admin Only)
Endpoint: /ecomm/api/v1/categories/:id

Method: DELETE

Authorization: Required (JWT token with Admin privileges)

Path Parameter:

id: Unique identifier of the category
Response:

On success:
Status Code: 200 (OK)
Response Body: A success message.
On error:
Status Code: 404 (Not Found) with a descriptive error message.
Error Handling
The API returns appropriate HTTP status codes and descriptive error messages for various scenarios.

**[Include any other relevant information, such as usage examples, rate limiting, versioning, and contact information]**
