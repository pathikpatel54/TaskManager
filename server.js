const express = require('express');
const taskRouter = require('./routes/tasks');
const db = require('./db');

db.on('error', console.error('MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const app = express();

app.use(express.json());

app.use('/tasks', taskRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
