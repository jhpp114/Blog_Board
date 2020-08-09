# Blog_Board

# npm framework used
- npm install express
- npm install ejs
- npm install mongoose
- npm install method-override
- npm install passport
- npm install passport-local
- npm install passport-local-mongoose
- npm install express-session
- npm install method-override
- npm install connect-flash

# Current Tree
```bash
.
├── README.md
├── app.js      
├── seed.js
├── package.json
├── models
|   └── comment.js
|   └── soccer.js
|   └── user.js
|   └── travel.js
|   └── coffee.js
└── middleware
    ├── middleware.js
├── public
|   |   images
│   │   ├── Coffee_main.jpg
│   │   ├── Introduction_img.jpg
│   │   ├── Nature_main.jpg
│   │   ├── Programming_main.jpg
│   │   ├── Soccer_main.jpg
│   │   └── Travel_main.jpg
│   ├── javascript
│   │   └── welcome.js
│   └── stylesheet
│       └── app.css
├── routes
│   ├── coffee.js
│   ├── comment.js
│   ├── global.js
│   ├── soccer.js
│   └── travel.js
└── views
    ├── blogs.ejs
    ├── coffee
    │   ├── coffee.ejs
    │   ├── detail.ejs
    │   ├── edit.ejs
    │   └── new.ejs
    ├── comment
    │   ├── coffeeEdit.ejs
    │   ├── coffeeNew.ejs
    │   ├── edit.ejs
    │   ├── new.ejs
    │   ├── travelEdit.ejs
    │   └── travelNew.ejs
    ├── partials
    │   ├── footer.ejs
    │   └── header.ejs
    ├── soccer
    │   ├── detail.ejs
    │   ├── edit.ejs
    │   ├── new.ejs
    │   └── soccer.ejs
    ├── travel
    │   ├── detail.ejs
    │   ├── edit.ejs
    │   ├── new.ejs
    │   └── travel.ejs
    ├── user
    │   ├── login.ejs
    │   └── register.ejs
    └── welcome.ejs
```bash
