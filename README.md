## Overview

This repository contains the codebase for the personal blog platform developed as part of the task. The platform allows users to sign up, log in, and post blog posts. Users can view all posts and filter them by author. The backend is built using Node.js and Express, while the frontend uses Next.js 14 with TypeScript.

## Task Description

Develop a personal blog platform where users can sign up, log in, and post articles. The platform should allow users to view all posts and filter them by author. The backend should be built using Node.js and Express, and the frontend should use Next.js 14 with TypeScript.

## Technologies Used

#### Frontend

- **Language:** TypeScript
- **Framework:** Next.js
- **CSS Framework:** Tailwind CSS

#### Backend

- **Language:** Typescript
- **Web Framework:** Express
- **ORM:** Mongoose
- **Databases:** MongoDB (main database)

## Usage

To utilize the Attack Capital personal blog website, follow these steps:

#### - Clone the Repository

```bash
git clone https://github.com/devHarshShah/blog-frontend
git clone https://github.com/devHarshShah/blog-backend
```
#### - Enviroment Variables
Copy content of .env.sample to .env and change the content only if required

# API (Backend)

## Endpoints

### 1. Get All Blog posts

- **Endpoint:** `GET /blog/posts`
- **Header:** Authorization - Bearer
- **Description:** Retrieve all posts
- **Response Format:**
  ```json
    {
      [
  {
    "_id": "66a6aef8c081299aa2bed6f3",
    "title": "Testing",
    "content": "Testing",
    "author": {
      "_id": "66a6aed4c081299aa2bed6ee",
      "name": "Ramya Gupta"
    },
    "created_at": "2024-07-28T20:50:00.295Z",
    "__v": 0
  },
        // Additional posts
      ]
  }
  ```

### 2. Create a post

- **Endpoint:** `POST blog/post`
- **Header:** Authorization - Bearer
- **Description:** Add a new post to the database.
- **Request Format:**

  ```json
  {
    "title": "Sample title",
    "content": "some content lorem ipsum yes"
  }
  ```

- **Response Format:** The response from the `POST /` endpoint is in JSON format and follows the structure below:

  ```json
  {
  "message": "Post created"
  }
  ```

### 3. Sign Up

- **Endpoint:** `POST /auth/signup`
- **Description:** Create a new user.
- **Request Format:**

  ```json
  {
  "name" : "Ramya Gupta",
  "email" : "rg07gupta@gmail.com",
  "password": "Harsh@2004"
  }
  ```

- **Response Format:** The response from the `POST /auth/signup` endpoint is in JSON format and follows the structure below:

  ```json
  {
    "message": "Sign Up Successful"
  }
  ```

### 6. Login

- **Endpoint:** `POST /auth/login`
- **Description:** Login route.
- **Request Format:**

  ```json
  {
  "email" : "rg07gupta@gmail.com",
  "password": "testing1234"
  }
  ```

- **Response Format:** The response from the `POST /auth/login` endpoint is in JSON format and follows the structure below:

  ```json
  {
  "token": "jwt_token",
  "message": "Successfully logged in!"
  }
  ```

  ### 7. Delete

- **Endpoint:** `DELETE /blog/post?id`
- **Description:** Delete Post.

- **Response Format:** The response from the `DELETE /blog/post?id` endpoint is in JSON format and follows the structure below:

  ```json

  {
  "_id": "66a768413c07002c78de6dab",
  "title": "Testing",
  "content": "Testing",
  "author": "66a6aed4c081299aa2bed6ee",
  "created_at": "2024-07-29T10:00:33.807Z",
  "__v": 0
  }
  ```

The application will be accessible at `http://localhost:3000` by default.


Best Regards,
Harsh Shah