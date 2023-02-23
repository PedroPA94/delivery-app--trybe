# Welcome to the Delivery App! :running:

<div align='center'>

![ezgif com-gif-maker](https://user-images.githubusercontent.com/75266925/194889837-08362920-12f6-4e28-b107-f2487ea5c852.gif)

</div>

This is a fullstack app of a beer delivery service. A user logged in as a buyer can browse through beer options, add them to the cart and finish the order, which will then be added to their orders list. Another user, with the role of a seller, can check orders they have received and update its status. An admin can check all registered users and register new ones.

## About

This was a group project developed while studying Back-end web development [@betrybe](https://github.com/betrybe). This was the final project for the Back-end certificate. The group got an approval of 100% on this project's mandatory requirements, and 97.7% on the overall requirements.

This was our first time building a fullstack app from the beginning. By using agile methodologies, like SCRUM and kanban, and doing code review, we were able to plan the app and constantly re-evaluate our work and what we were doing. Together, we prototyped the app with [Figma](https://www.figma.com/file/8quEpcnij9tGUC6bPR2kgW/Delivery-App?node-id=0%3A1&t=DhfjWBPfiyoyquQy-1) and styled it using Styled Components. 

All the files we worked on are in the `/src` folders in the `back-end` and `front-end` directories.

The team: [@albertassihatus](https://github.com/albertassihatus), [@Camila-Falaschi](https://github.com/Camila-Falaschi), [@ellenmelody](https://github.com/ellenmelody), and [@rogelins](https://github.com/rogelins) 

#### My main contributions to the project
 - credentialsValidations and errorHandler middlewares in the back-end
 - Login route in the back-end
 - useLocalStorage custom hook
 - OrderCard component in the front-end
 - Back-end and front-end for the admin page and products page
 - Toast notifications
 - Add loading spinners in the front-end
 - CSS for the Header component and Products and Order Details pages
 - All tests, except the ones for the login and register routes/components (90% coverage on the back-end, 60% on the front-end)
 

## Main languages and tools used

<strong>Front-end</strong>
- React
- React Router
- React Hooks
- Context API
- Axios
- React Testing Library and Jest
- Styled Components

<strong>Back-end</strong>
- Node
- Express
- JWT
- MySQL
- Sequelize
- Mocha/Chai/Sinon

## Installation and usage

<strong>Important:</strong> the app was developed for mobiles, primarily for resolutions around 360x800, so we recommend running it the same way

- Clone the repository
- Install the dependencies with ``` npm install ``` on the root, front-end and back-end folders (requires node on version 16)
- Configure the _.env_ files
- Running the app:
  - Front-end: `npm start`
  - Back-end: `npm start` or `npm run dev` for live reload, `npm run db:reset` to reset the database
  - Root folder: `npm start` or `npm run dev` for live reload. Runs the entire app.
- Stop any running instance with `npm stop` on the root folder
- Run the tests we made with ```npm test``` or ```npm test <test name>```, either on the back-end or front-end folders
- Check test coverage with `npm run test:coverage` on the back-end or front-end folders
- Run the project's requirements tests with ```npm test``` or ```npm run test <test-name>``` on the root folder (might not show 100% approval as we made changes after finishing it)
