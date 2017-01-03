/* global process */

const port = process.env.PORT || 3000;
const Koa = require('koa');
const serve = require('koa-static');
const convert = require('koa-convert');
const app = new Koa();
const thisUse = app.use;
app.use = x => thisUse.call(app, convert(x));
app.use(serve('./build'));

const server = app.listen(port, function () {
  console.log('listening at http://%s:%s', server.address().address, server.address().port); // eslint-disable-line
});
