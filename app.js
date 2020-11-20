const express = require('express');
const morgan = require('morgan');
const app = express();
const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];

// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// });


app.listen(3000);

app.use(morgan('dev'));

// middleware & static files
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Home', blogs});
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About'});
});
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a newblog'});
});

app.use((req, res) => {
    res.status('404').render('404', {title: '404'});
});


//sending index.html
app.get('/', (req,res) => {
    // res.send('<p>home page</p>');
    res.sendFile('./views/index.html', { root: __dirname});
})
//sending about.html
app.get('/about', (req,res) => {
    // res.send('<p>About page</p>');
    res.sendFile('./views/about.html', { root: __dirname});
})
//redirect to about page
// app.get('/about-us', (req,res) => {
//     res.redirect('/about');
// })
app.use((req,res) => {
    res.status(404).sendFile('./views/404.html', {root: __dirname});
})








