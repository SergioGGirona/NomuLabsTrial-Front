# Social Network CookBook

The goal of this challenge is to evaluate candidates' technical skills in developing a Simple Social Network using Node.js and React.js. Candidates should create an application that allows users to register, search for other users by username, create posts, follow other users, view content created by the users they follow, set privacy settings, and perform actions such as commenting and liking posts.

**If you want to try the application, I recommend that you log in as Luffy, Zoro or Sanji** (the password is exactly the same as the username).

## Front

The project has been developed with Vite as compiler to write in Typescript and modular Scss. Redux has been used to manage the state and ad hoc hooks have been created with the thunks to manage the different actions that call the back.

### Overview

The website (focused on mobile first due to its social nature) currently has two main pages, with a menu that appears at all times for navigation.
The pages are Home, where the posts are rendered (which are cooking recipes with a pirate setting), and Profile, where the user can see their own information and update it. In future implementations, your posts will also appear so that you can update them.

### Routes

Routes have a lazy nature to adjust the data load. They are reflected in App and defined in app.routes, where, apart from the two pages mentioned above, there are some components that act as pages due to their temporary nature, such as postForm (to publish a new recipe), register/login or postDetail (to see the complete recipe since only a few data are shown in home to encourage openness).

### State

The state is managed with Redux, and for this we create on one side the thunks where we delimit the information to be sent and received to the back to protect the database also from the front (see readme of the back).

On the other hand, we also have a slice where we define the initial state of each entity (based on the data we can use and want to update) and which we update according to the thunk we are using.

We have a custom hook for each entity (useUsers, usePosts and in the future useComments) that provides a convenient interface to interact with the functionality related to each entity in this application. a tUses React Redux's useSelector and useDispatch to access the global state of the application and dispatch actions respectively.

This hook exposes the different functions that interact with the Redux state through thunks, which encapsulate the asynchronous logic of the application, providing a clean and coherent abstraction for user management operations.
