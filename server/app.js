const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const fileUpload = require('express-fileupload');
const fs = require('fs').promises;
const User = require('./models/user.model');
const { check } = require('./middlewares/check');
const uploadRouter = require('./router/upload');
const File = require('./models/file.model');
const { constants } = require('os');

const app = express();

// console.log(require('crypto').randomBytes(32).toString('hex'));
const secretKey =
  'bb07ff75662779372fe47de197e711de8f7dbc8911ddf64dee5fcad5c569054d';

app.set('cookieName', 'myCookie');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    // 'Access-Control-Allow-Origin': 'http://localhost:3000',
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(fileUpload({}));

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    name: app.get('cookieName'),
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/loader',
    }),
    cookie: {
      httpOnly: true,
      maxAge: 86_400_000,
    },
  })
);

app.use('/upload', uploadRouter);

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const secretPass = await bcrypt.hash(password, 10);
    try {
      const currentUser = await User.create({
        name,
        email,
        password: secretPass,
      });
      if (currentUser) {
        req.session.user = {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
        };
        return res.sendStatus(200);
      }
    } catch (e) {
      return res.sendStatus(401);
    }
  }
  return res.sendStatus(401);
});

app.get('/checkAuth', check, (req, res) => {
  const id = req.session?.user?.id;
  if (id) {
    const { name } = req.session.user;
    return res.json({ name }).status(200);
  }
  return res.sendStatus(401);
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(401);
    res.clearCookie(req.app.get('cookieName'));
    console.log(req);
    return res.sendStatus(200);
  });
});

app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const currentUser = await User.findOne({ name });
  if (currentUser) {
    const validation = await bcrypt.compare(password, currentUser.password);
    if (validation) {
      req.session.user = {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
      };
      return res.sendStatus(200);
    } else {
      return res.sendStatus(401);
    }
  } else {
    return res.sendStatus(401);
  }
});

app.get('/lk', check, async (req, res) => {
  const user = await User.findById(req.session.user.id);
  const files = await File.find({ user: req.session.user.id });
  const allFiles = files.map((file) => {
    const { _id, name, size, user } = file;
    const dataFile = { _id, name, size, user };
    return dataFile;
  });

  res
    .json({ user: { name: user.name, email: user.email }, allFiles })
    .status(200);
});

app.post('/deleteFile', check, async (req, res) => {
  try {
    const deleteFile = await File.findOneAndDelete({
      user: req.session.user.id,
      _id: req.body.id,
    });
    const pathToFile = `${__dirname}/public/images/${deleteFile.name}`;
    await fs.unlink(pathToFile);
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

app.post('/editFile', async (req, res) => {
  const { name, id } = req.body;
  try {
    const oldFile = await File.findById(id);
    const oldFileName = oldFile.name;
    const arrayOfNewName = name.split('.');
    const arrayOfOldName = oldFile.name.split('.');
    const pathToFile = `${__dirname}/public/images/${oldFileName}`;
    console.log(arrayOfNewName[arrayOfNewName.length - 1]);
    if (
      arrayOfNewName[arrayOfNewName.length - 1] ===
      arrayOfOldName[arrayOfOldName.length - 1]
    ) {
      oldFile.name = name;
      await oldFile.save();
      fs.rename(pathToFile, `${__dirname}/public/images/${oldFile.name}`);
      res.json(oldFile).status(200);
    } else if (
      arrayOfNewName[arrayOfNewName.length - 1] !==
        arrayOfOldName[arrayOfOldName.length - 1] &&
      arrayOfNewName.length > 1
    ) {
      const newName = name.replace(
        arrayOfNewName[arrayOfNewName.length - 1],
        arrayOfOldName[arrayOfOldName.length - 1]
      );
      oldFile.name = newName;
      await oldFile.save();
      fs.rename(pathToFile, `${__dirname}/public/images/${oldFile.name}`);
      res.json(oldFile).status(200);
    } else {
      oldFile.name = `${name}.${arrayOfOldName[arrayOfOldName.length - 1]}`;
      await oldFile.save();
      fs.rename(pathToFile, `${__dirname}/public/images/${oldFile.name}`);
      res.json(oldFile).status(200);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.listen(4000, () => {
  mongoose.connect(
    'mongodb://localhost:27017/loader',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    console.log('db ise ready')
  );
  console.log('Server is ready');
});
