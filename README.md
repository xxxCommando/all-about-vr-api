# Api typescript boilerplate

API boilerplate in Typescript.

## EndPoints

- [Register](#register)
- [Login](#login)
- [User](#user)

## How to launch

```bash
# Clone the project
git clone https://github.com/Bleuh/api-typescript-boilerplate

# Install dependencies
yarn
```

I recommanded to use docker to launch the project.
You can find the install process [here](https://docs.docker.com/get-docker/).

```bash
docker-compose up
```

If you don't have docker, use the default `yarn start`, but you need to have the right environment (mongodb) in your `.env`.

You can now use the api on `http://localhost:3000/`

## Routes available

I will show you here some example for each route

> /

This route gives you all routes available

### Register

**URL** : `/register`

**Method** : `POST`

**Data constraints**

```json
{
    "login": "[valid login]",
    "password": "[password in plain text]"
}
```

#### Success Response

User created.

**Code** : `201 CREATED`

**Content example**

```json
{
    "message": "User successfully created.",
    "error": null,
    "data": {
        "dateOfEntry": "2020-10-01T10:12:39.787Z",
        "lastUpdated": "2020-10-01T10:12:39.787Z",
        "_id": "5f75abc2f2e478003494bea1",
        "login": "Bleuh5",
        "password": "$2a$10$RIX5D0DOWMl7udaQrVNbCe9bco73qJwuJzCcoT1JxLunXBvRXSSNq",
        "__v": 0
    }
}
```

#### Error Response

**Condition** : Something get wrong with the request.

**Code** : `400 BAD REQUEST`

**Condition** : If user already exist.

**Code** : `409 CONFLICT`

## Login

**URL** : `/login`

**Method** : `POST`

**Data constraints**

```json
{
    "login": "[valid login]",
    "password": "[password in plain text]"
}
```

#### Success Response

User created.

**Code** : `200 OK`

**Content example**

```json
{
    "message": "User found.",
    "error": null,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzQ2ZDcwZmIyMWY4MDAyNzA4MDAyMyIsImlhdCI6MTYwMTU0NzE3Nn0.hWjKHbkIiglL2LK2cQJEhnD3As4uwTg-2sTbkR8199o"
    }
}
```

#### Error Response

**Condition** : Something get wrong with the request.

**Code** : `400 BAD REQUEST`

**Condition** : If 'login' and 'password' combination is wrong.

**Code** : `401 UNAUTHORIZED`

### User

**URL** : `/user/info`

**Method** : `POST`

**Auth required** : Authorization header with Bearer token

#### Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "message": "User found",
    "error": null,
    "data": {
        "dateOfEntry": "2020-09-30T11:34:35.941Z",
        "lastUpdated": "2020-09-30T11:34:35.941Z",
        "_id": "5f746d70fb21f80027080023",
        "login": "Bleuh",
        "password": "$2a$10$AMMv0hBg2YE/XTXsD1qq6uk.JShnLuejSlTo/E7bAX56GW6MSdP1i",
        "__v": 0
    }
}
```

#### Error Response

**Condition** : If access token is wrong.

**Code** : `401 UNAUTHORIZED`
