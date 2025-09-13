const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const boardsRouter = require('./routes/boards');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/boards', boardsRouter);
app.use('/tasks', tasksRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
