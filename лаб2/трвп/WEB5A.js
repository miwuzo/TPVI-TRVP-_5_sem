const Koa = require('koa');//фреймворк для создания веб-приложений на Node.js
const Router = require('koa-router');//для маршрутизации в Koa
const fs = require("fs").promises; //async/await
const path = require("path");

const app = new Koa();
const router = new Router();
const port = 3000;

app.use(require('koa-bodyparser')()); //для обработки входящих данных в формате JSON. Он добавляет возможность автоматически парсить тело запроса 

router.get('/', async (ctx) => {
    const filePath = path.join(__dirname, 'WEB5A.html');
    const text = await fs.readFile(filePath, 'utf8');
    ctx.body = text;
});

router.post('/calculate', async (ctx) => {
    const x = parseInt(ctx.request.header['x-value-x']);
    const y = parseInt(ctx.request.header['x-value-y']);

    const z = x + y;

    ctx.set('X-Value-z', z.toString());
    ctx.status = 200;
});

app.use(router.routes());
app.use(router.allowedMethods());//Добавляет поддержку методов HTTP

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));