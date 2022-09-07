const express = require('express');
require('express-async-errors');
const errorMiddleware = require('./middlewares/error');
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const categoriesRouter = require('./routes/categoriesRouter');

// ...

const app = express();

app.use(express.json());

// ...
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);

app.use(errorMiddleware);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;