# README

**Code Setup Instructions:**

1. You must have Nodejs & npm/yarn installed on your local machine.
    1. For installing Nodejs & npm follow [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
    2. For installing yarn follow [https://classic.yarnpkg.com/lang/en/docs/install/](https://classic.yarnpkg.com/lang/en/docs/install/)
2. Clone the git repository at [https://github.com/hazique/pexel-photo-browser](https://github.com/hazique/pexel-photo-browser)

**Getting a Pexels API Key**

To work with the Pexels API, you need an API key. To get a key;

1. Create a free Pexels account
    1. https://www.pexels.com/onboarding
    2. Follow “I want to download”
    3. Complete the form. Make sure you use a valid email address
2. Confirm your email
3. Visit the Image & Video API section of your account
4. Provide a description and a URL. These can be fake, feel free to use the examples below or write your own.
    1. Example description: “I’m using the API for programming practice projects”
    2. Example URL: https://example.com

On completing the above steps, you need to open a Terminal window in the project directory.

**Setting up the API key in the Project**

- Make a `.env` file in the project root directory and paste your API key in the format below

```json
PEXELS_API_KEY="<YOUR API KEY>"
```

**Loading dependencies and running the project**

To install all dependencies:

```jsx
npm install
```

To develop and run the project locally use

```jsx
npm run dev
```

To create and deploy a build, run:

```jsx
npm run build
npm serve
```