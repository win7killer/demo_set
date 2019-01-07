/**
 *

 */
const http = require('http');
const https = require('https');
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(async (ctx, next) => {
    await next();
});


// router.get('/', async (ctx, next) => {
//     ctx.response.body = '<h1>Index</h1>';
// });

// router.get('/index', async (ctx, next) => {
//     ctx.response.body = '<h1>index 1</h1>';
// });

// router.get('/show/:id', async (ctx, next) => {
//     let id = ctx.params.id;
//     ctx.response.body = `<h1>${id}</h1>`;
//     await next();
//     ctx.body += '888'
// });

// router.get('/about', async (ctx, next) => {
//     ctx.response.body = '<h1>about</h1>';
// });

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});


app.use(bodyParser());
app.use(router.routes());

app.use(async (ctx, next) => {
    ctx.body += '666';
});
// app.listen(8900)
http.createServer(app.callback()).listen('8900');
// https.createServer(app.callback()).listen('8901');
