# Social-Network

## ✏️ Description
Social Network is a Node application that uses Express for routing, moment.js for date and time handling, and MongoDB /Mongoose for database handling.


## Table Of Contents
- [Installation](#💾-installation)
- [Usage](#💡-usage)
- [Contributing](#👥-contributing)
- [Tests](#🔍-tests)
- [Questions](#💭-questions)
- [License](#📚-license)

## 💾 Installation
First clone the repo, on to your computer:

```
git clone
```

Change directories into the cloned repo and run npm install:

```
 npm install
```


## 💡 Usage
While in the root directory, run:

```
node index.js
```
or 
```
npm run start
```
Then you may test the app on insomnia. 


## 👥 Contributing
To contribute to the Team Profile Generator:
 1. Please first **Fork** the repo on GitHub
 2. **Clone** the project on your computer
 3. **Commit** the changes you would like to see
 4. **Push** to your existing forked project
 5. Finally please submit a **Pull request**

## 🔍 Tests

Some example tests you may run with insomnia are: 

 creating a new user:
```
POST api/users
{
  "name": "John Doe",
  "email": " John@fakemail.com"
}
```

creating a thought: 

(take the user id from the previous request)
```

POST api/thoughts
{
  "thoughtText": "I like lasagna!",
  "username": "bob",
  "userId": "62d0d131f7ab2ed1c22ea085"
}
```

## Video
 
 To see more tests, watch the video. 

[Part 1 Insomnia Testing](https://vimeo.com/731548737)
[Part 2 Insomnia Testing](https://vimeo.com/731548300)

## 💭 Questions
If you have any questions, please make an issue within the repo or visit my GitHub profile at [zzzbia's github](https://github.com/zzzbia)


## 📚 License
Licensed under [ APACHE](https://opensource.org/licenses/Apache-2)