# COMP-2140-Project

## Tools Needed 

- NodeJs
- MongoDb
- Vue JS (run npm i -g @@vue/cli after downloading NodeJs)

### To run the app

After you have installed all the tools successfully. Run npm i or npm install in both the front end and backend to download the depdencies)

- To run the front end, run `npm run serve`
- To run the backend, run `node index.js` (after making a change you have to `ctrl+c` and run `node index.js` again or install `nodemon` and run `nodemon index.js` to watch for changes and automatically rebuild :))
- Ensure mongo is installed on your computer so the program doesn't break looking for a connection

## Working on Features 
- If you are working on a feature use git to create a feature branch
- Use `git checkout -b feature-name-of-feature`, always put feature in front
- If you are ready to merge a feature, first merge what's in master into your feature branch, then create a pull request to the master on github
- It's better to rebase the master into your feature branch so that the history can be maintained
- If you encounter any merge conflicts it is up to you to resolve them and ensure that they are working on the master (outside your feature branch)