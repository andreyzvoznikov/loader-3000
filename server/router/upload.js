const { Router } = require('express');
const router = Router();
const File = require('../models/file.model');
const { check } = require('../middlewares/check');

router.post('/', check, async (req, res) => {
  try {
    const { name } = req.body;
    const { file } = req.files;
    const oldName = file.name.split('.');
    const type = oldName[oldName.length - 1];
    const path = `${__dirname.replace(
      'server/router',
      '/client/'
    )}/public/images/${name}.${type}`; 
    // const path = `${__dirname.replace(
    //   'router',
    //   ''
    // )}/public/images/${name}.${type}`; // для сохранения на сервере
    const newFile = await File.create({
      name: `${name}.${type}`,
      size: file.size,
      user: req.session.user.id,
    });
    if (newFile) {
      await file.mv(path);
      const { _id, name, size, user } = newFile;
      const fileToSend = { _id, name, size, user };
      res.json(fileToSend).status(200);
    } else {
      res.status(500).json({ message: 'Файл с таким именем уже есть' });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Ошибка загрузки' });
  }
});

module.exports = router;
