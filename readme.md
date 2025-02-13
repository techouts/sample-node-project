Frontend Build: NEXT JS App
This project was bootstrapped with create-next-app.
With Next.js you can use multiple apps as a single app using its multi-zones feature

Scripts
In the project directory, you can run the following commands:

npm install && npm run dev

The app should be up and running in http://localhost:3000!

npm run build

Builds the app for production to the build folder. It bundles Next in production mode and optimizes the build for the best performance.This output is generated inside the .next folder.
All JavaScript code inside .next has been compiled and browser bundles have been minified to help achieve the best performance and support all modern browsers.


Mandatory guidelines

1. Branching

Branch name should either be created from JIRA tasks or it should be a meaningful name.

##### Correct usage

`feature/OM-71-Beauty-advice-ui-component`, `bugfix/OM-71-Beauty-advice-ui-component-fixes`

##### Incorrect usage

`feature/Beauty-advice`

2. Use JIRA IDs in commit message.

git commit -m "OM-71: created a Beauty advice ui component"

Every commit message should in active case. Must not be greater than 72 characters. Should
summarize the code changes in commit.

3. Use JIRA IDs with proper description in MR title and description.

5. Avoid making large pull requests.

6. Check for logs and remove them if not required.

7. Use npm run build in local before every commit to see whether your build is getting generated successfully or not.

8. Use try-catch when writing complex JS logic.

9. HOC Folder - pure UI component for same logic or component structure.

10. Common Folder - pure UI fucntional component for logic based on the flags.

11. Fix eslint-issues on the fly.
