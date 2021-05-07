import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import Axios from 'axios';
import { addFileAC, allFilesAC } from '../../redux/actionCreaters/fileAC';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import ModaleDelete from '../ModalDelete/ModalDelete';
import { openDeleteModalAC } from '../../redux/actionCreaters/deleteModalAC';
import { openEditModalAC } from '../../redux/actionCreaters/editModalAC';

// const concat = require("concat-stream")

const useStyles = makeStyles({
  table: {
    marginTop: 50,
    minWidth: 650,
    minHeight: 300,
  },
  input: {
    minWidth: 270,
  },
  container: {
    marginBottom: 50,
  },
  info: {
    marginTop: 20,
    marginBottom: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  titleOfForm: {
    marginBottom: 10,
  },
  delEditButtons: {
    maxWidth: 10,
  },
});

function LK() {
  const classes = useStyles();

  // const [lk, setLk] = useState({}); // заводим локальное состояние, так как в редаксе не стоит хранить секретные данные (в данном случае e-mail)
  const allFiles = useSelector((state) => state.files);
  const [name, setName] = useState('');
  const [file, setFile] = useState();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const deleteModal = useSelector((state) => state.deleteModal);
  // const editModal = useSelector((state) => state.editModal);

  const openDeleteModalHandler = (id) => {
    dispatch(openDeleteModalAC(id));
  };

  const openEditModalHandler = (id, name) => {
    dispatch(openEditModalAC(id, name))
  }

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:4000/lk', {
        credentials: 'include',
      });
      if (response.status === 200) {
        const serverResponse = await response.json();
        dispatch(allFilesAC(serverResponse.allFiles));
      }
    })();
  }, []);

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const sendFileHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('file', file);
    // const response1 = await Axios.post('http://httpbin.org/anything', data);
    // console.log(response1);
    // для проверки, что корректно файлы попали в формадата, так как в браузере в консоли будет пустой объект

    // const config = {
    //   onUploadProgress: function (progressEvent) {
    //     const percentCompleted = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     );
    //     console.log(percentCompleted);
    //   },
    // }; // Для отслеживания прогресса
    const response = await Axios.post('http://localhost:4000/upload', data, {
      withCredentials: true,
    });
    if (response.status === 200) {
      dispatch(addFileAC(response.data));
      setName('');
      setFile();
    }
  };

  function byte(counter) {
    switch (counter) {
      case 0:
        return 'байт';
      case 1:
        return 'Кб';
      case 2:
        return 'Мб';
      case 3:
        return 'Гб';
      case 4:
        return 'Тб';
      default:
        return 'дофига';
    }
  }

  function convertTo(number, counter) {
    if (number < 100) return `${number.toFixed(2)} ${byte(counter)}`;
    else {
      number /= 1024;
      counter += 1;
      return convertTo(number, counter);
    }
  }

  const fullSize = () => {
    const sum = allFiles.reduce((acc, file) => {
      return acc + file.size;
    }, 0);
    return convertTo(sum, 0);
  };

  function checkImage(name) {
    let finalName = name.split('.');
    if (
      finalName[finalName.length - 1] === 'jpg' ||
      finalName[finalName.length - 1] === 'png' ||
      finalName[finalName.length - 1] === 'jpeg' ||
      finalName[finalName.length - 1] === 'ico' ||
      finalName[finalName.length - 1] === 'bmp' ||
      finalName[finalName.length - 1] === 'gif'
    ) {
      return `http://localhost:4000/images/${name}`;
    } else {
      return 'https://xn--90abhccf7b.xn--p1ai/800/600/https/fb.ru/misc/i/gallery/10783/1689212.jpg';
    }
  }

  return (
    <>
      <Typography className={classes.info} component="h1" variant="h5">
        Привет, {user.name}! Ты загрузил {allFiles.length} файлов общим размером{' '}
        {fullSize()}
      </Typography>
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />

        <Typography className={classes.titleOfForm} component="h1" variant="h5">
          Загрузи меня полностью
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={name}
                onChange={changeNameHandler}
                className={classes.input}
                id="outlined-basic"
                label="Имя файла"
                variant="outlined"
                type="text"
                name="name"
              />
            </Grid>
            <Grid>
              {file ? (
                <Button onClick={() => setFile()} variant="contained">
                  Очистить файл
                </Button>
              ) : (
                <Button variant="contained" component="label">
                  Подгрузить файл
                  <input
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                    }}
                    type="file"
                    id="file"
                    name="file"
                    hidden
                    // accept=".jpg"
                  />
                </Button>
              )}
              <Button
                onClick={(e) => sendFileHandler(e)}
                variant="contained"
                component="label"
              >
                Отправить инфу
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      {allFiles.length ? (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Превью</TableCell>
                <TableCell align="right">Название файла</TableCell>
                <TableCell align="right">Размер</TableCell>
                <TableCell align="right">Редактировать/удалить</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allFiles.map((file) => (
                <TableRow key={file._id}>
                  <TableCell component="th" scope="row">
                    <img
                      src={checkImage(file.name)}
                      alt={`Превью ${file.name}`}
                      height="150px"
                    />
                  </TableCell>
                  <TableCell align="right">{file.name}</TableCell>
                  <TableCell align="right">{convertTo(file.size, 0)}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={()=> openEditModalHandler(file._id, file.name)}
                      className={classes.delEditButtons}
                      // variant="contained"
                    >
                      <img src="/edit.png" height="25px" alt="Ред." />
                    </Button>
                    <Button
                      onClick={() => openDeleteModalHandler(file._id)}
                      className={classes.delEditButtons}
                      // variant="contained"
                    >
                      <img src="/delete.png" height="25px" alt="Уд." />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography className={classes.info} component="h2" variant="h5">
          Пока нет файлов, но уже можно загружать
        </Typography>
      )}
    </>
  );
}

export default LK;
