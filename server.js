const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_colors_db');

const Color = conn.define('color', {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/colors', async(req, res, next)=> {
  try {
    res.send(await Color.findAll());
  }
  catch(ex){
    next(ex);
  }
});

const start = async()=> {
  try {
    await conn.sync({ force: true });
    const colors = await Promise.all(
      ['dodgerBlue', 'cornSilk', 'tomato'].map( name => Color.create({ name }))
    );
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));

  }
  catch(ex){
    console.log(ex);
  }
};

start();
