const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');


// connect to mongoDB
const dbURI = 'mongodb+srv://NetNinja:Craw8255@cluster0.95szj.mongodb.net/nodetuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

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


//register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// app.get('/all-blogs', (req,res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })

// app.get('/single-blog', (req,res) => {
//     Blog.findById('5fbabb90bd0af3887dba3b3f')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })






app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About'});
});

// blog routes
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
                res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
                console.log(err);
        });
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', {blog: result, title: 'Blog Details'})
        })
        .catch(err => {
            console.log(err);
        })
})

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'})
        })
        .catch(err => {
            console.log(err);
        })
})
   

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








