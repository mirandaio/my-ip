const path = require('path');
const koa = require('koa');
const serve = require('koa-static');
const views = require('co-views');

let app = koa();
let render = views(path.join(__dirname, '/views'), {ext: 'ejs'});

app.proxy = true;

app.use(serve('public'));

app.use(function *() {
  this.body = yield render('index', {ip: this.request.ip});
});

app.listen(process.env.PORT || 8080);
