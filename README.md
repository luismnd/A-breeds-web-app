# Using a Breeds API Project

<p align="left">
  <img height="200" src="./dog.png" />
</p>

## Project Goals
- Build an App using React, Redux, Node and Sequelize
- Apply best practices
- Use git workflow


## BoilerPlate
This project is structured in two folders; `api` and `client` each one containing the code for the back-end and the front-end respectively.
I use a `.env` file  structured as follow for sensitive information:
```
DB_USER=postgresUser
DB_PASSWORD=postgresPassword
DB_HOST=localhost
```
For testing and implementation create and replace `postgresUser` y `postgresPassword` fro your own.
The `client` structure has been created using `Create React App`.

## Description

The general idea is to create an application in which different breeds of dogs can be seen along with relevant information about them using the external api [the dog api](https://thedogapi.com/) and from there you can, among other things:
   - Search dogs breeds
   - Filter / Sort them
   - Add new dogs breeds

#### Implemented technologies:
- [X] React
- [X] Redux
- [X] Express
- [X] Sequelize - Postgres

## Frontend description
Is a React/Redux application with the following screens/routes:

__Landing page__: 
- [X] Has a project-related image and a home button to launch the application.

__Home screen__:
- [X] Search input that finds dogs breeds by name
- [X] Area fos dogs breeds listing with an image, name, list of temperaments and weight range information
- [X] Filtering controls by temperaments and breed source(if created or from the external API)
- [X] Sorting controls by name and weight
- [X] Pagination buttons

__Dog breed detail__:
- [X] Information shown in home screen (image, name, list of temperaments and weight range)
- [X] and height range and longevity

__Dog breed creation form__:
- [X] A __controlled__ form with inputs for: name, height, weight and longevity
- [X] A drop down list for temperament multi selection

## Backend description
A Node/Express server with the following routes:
- [X] __GET /dogs__:
  - Get a list of dogs breeds
  - Returns an ordered list with the required data for the home screen
- [X] __GET /dogs?name="..."__:
  - Get a list of dogs breeds that contains the query parameter
- [X] __GET /dogs/{breedId}__:
  - Get a dog breed detail
- [X] __GET /temperament__:
  - Obtener todos los temperamentos posibles
  - Get a list of all temperaments present in dogs breeds and the user created
- [X] __POST /dog__:
  - Receives from body a collection of data from the breeds creation form
  - Creates a new dog breed in the database

#### Database description
Two Sequelize database models:
- [X] Breeds model with the following properties: ID, name, height, weight, longevity
- [X] Temperament model with the following properties: ID, name
Many to many relationship between both models.
