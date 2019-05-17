const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require('./api/routes/authRouter')();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
