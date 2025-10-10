# API Manual

This document describes the available API endpoints for authentication and post management. It is intended for frontend and backend developers to easily understand how to use the API.

---

## Base URL


---

## Authentication Endpoints

| No. | Endpoint | Method | Auth Required | Request Body / Params | Success Response | Error Response | Notes |
|-----|---------|--------|---------------|----------------------|-----------------|----------------|-------|
| 1 | `/auth/register` | POST | No | `{ name: string, email: string, password: string }` | `200 OK` → `{ message: "Register Success!!!" }` | `409 Conflict` → Email already exists <br> `400 Bad Request` → Validation error | Creates a new user; password is hashed |
| 2 | `/auth/login` | POST | No | `{ email: string, password: string }` | `200 OK` → `{ message: "Login Success!!!", payload: { id, name, role }, token }` | `401 Unauthorized` → Invalid email/password <br> `400 Bad Request` → Validation error | Returns JWT token for accessing protected endpoints |



## Usage Notes

1. **Authentication Flow:**  
   - Register → call `/auth/register` with `name`, `email`, `password`.  
   - Login → call `/auth/login` with `email`, `password` → store returned JWT token.  
   - Include the JWT token in the `Authorization` header for protected endpoints:  
     ```
     Authorization: Bearer <JWT_TOKEN>
     ```

2. **Error Handling:**  
   - `400 Bad Request` → Validation errors.  
   - `401 Unauthorized` → Missing/invalid token or invalid credentials.  
   - `404 Not Found` → Resource not found.  
   - `409 Conflict` → Duplicate resource (email exists).  
   - `500 Internal Server Error` → Server issues.  

---

## Example Requests

### Register
```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Login
```json
POST /auth/login
{
  "email": "john@example.com",
  "password": "123456"
}
Response
{
  "message": "Login Success!!!",
  "payload": {
    "id": 1,
    "name": "John Doe",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

