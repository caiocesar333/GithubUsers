# GitHub Users

This project is a test answer requested by Shaw and Partners made with React and Node.js.
Deadline: 2 days.
Check [Functionalities](#functionalities) to see what was implemented

## Software Description

```
 "You will have to consume the GitHub APIs, more precisely the users and
  repositories endpoints, and create an application.

  The endpoints' documentation that you will use for this test are available
  at:

    https://developer.github.com/v3
    https://developer.github.com/v3/users
    https://developer.github.com/v3/repos/"
```

## 🚀 Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

See [Functionalities](#deployment) for notes on the deployed project.

### 📋 Prerequisites

```
Visual Studio Code
Git/Git Bash
Node
```

### 🔧 Installation

To install the project, follow these steps:

1. Clone the repository using the command `git clone`.

[GithubUsers](https://github.com/caiocesar333/GithubUsers) - private repository

2. After cloning the repository, open it in VSCode.

#### For Backend:

1. Navigate to the `backend` directory.

```
cd backend
```

2. Install dependencies.

```
npm install
```

3. Build the project.

```
npm start
```

#### For Frontend:

1. Navigate to the `frontend` directory.

```
cd frontend
```

2. Install dependencies.

```
npm install
```

3. Start the development server.

```
npm run dev
```

3. Navigate to `components` and, in both `GitHubUsers` and `UserDetail` components, change the value of "API_BASE_URL" to "http://localhost:3000". This is a important step in order to see the application running fully

## 🛠️ Built With

Here are the tools used to create this project:

- [React](https://react.dev) - A JavaScript framework for building user interfaces.
- [Vite](https://vitejs.dev) - Frontend Tooling.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript that compiles to plain JavaScript.
- [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://expressjs.com/) - A popular web application framework for Node.js.
- [Axios](https://axios-http.com/docs/intro) - Axios is a promise-based HTTP Client for node.js and the browser.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom user interfaces.
- [ReactRouter](https://reactrouter.com/en/main) - Enables "client side routing".

## ✒️ Authors

[Caio César](https://github.com/caiocesar333)

## 📄 License

This project is a challenge and is not licensed. See the [LICENSE.md](https://github.com/caiocesar333/project/license) file for details.

## <a id="functionalities"></a>🛠️ Functionalities / Steps

 [full-stack] [back-end]
    Create an API that will proxy all client requests to the appropriate
    GitHub endpoint. The following endpoints must be provided:

        GET - /api/users?since={number}
        This endpoint must return a list of GitHub users and the link for
        the next page.

        GET - /api/users/:username/details
        This endpoint must return the details of a GitHub user

        GET - /api/users/:username/repos
        This endpoint must return a list with all user repositories


    [full-stack (optional)] [back-end]
    Create tests for your application covering all endpoints.

    [full-stack] [front-end]
    Create a screen that will list all users from GitHub and will display
    their ID and Login. Remember, you can’t list all users at once, you will
    have to use pagination.

      (if you are doing this test for the front-end role, you have to
      consume the GitHub endpoints directly)

      (if you are doing this test for the full stack role, you must consume
      the endpoints that you created at step 1)

    [full-stack] [front-end]
    Using the screen created in step 3, create a new screen that will
    display the details of a user (ID, Login, Profile URL and the date of
    the login creation).

    [full-stack] [front-end]
    On the details screen (created on step 4) add a table that will display
    the public repositories of the user, this table must contain the ID,
    name, and URL to the repository.

## <a id="tests"></a>🔨 Running tests

1. Navigate to the `backend` directory.

```
cd backend
```

2. Run the tests.

```
npm run tests
```

## <a id="deployment"></a>🔨 Deployment

Backend deployed link:

```
https://github-users-test.onrender.com
```

Frontend deployed link:

```
https://github-users-test-frontend.onrender.com
```

Note that the FrontEnd is on a Static site. The pagination of the front end is working properly on Render, but is not as fast as a localhost API call.