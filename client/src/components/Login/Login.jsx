import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../customHooks/useInput';
import {
  checkEmail,
  checkName,
  checkPassword,
} from '../../helpers/validateFunc';
import { sagaLoginAC } from '../../redux/actionCreaters/userAC';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#ee82ee',
  },
}));

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  const isAuth = useSelector((state) => state.user.isAuth);
  let { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (isAuth) {
      history.replace(from);
    }
  }, [isAuth]);

  let inputs = [
    useInput({
      label: 'Ваше имя или никнейм',
      name: 'name',
      validateFunc: checkName,
      id: 'name',
      autoComplete: 'name',
    }),
    useInput({
      label: 'Пароль',
      type: 'password',
      validateFunc: checkPassword,
      name: 'password',
      id: 'password',
      autoComplete: 'current-password',
    }),
  ];

  const submitForLoginHandler = (e) => {
    e.preventDefault();
    if (inputs.every((input) => input.isValid())) {
      const formData = Object.fromEntries(new FormData(e.target).entries());
      dispatch(sagaLoginAC(formData));

      inputs.forEach((input) => {
        const a = document.querySelector(`#${input.forTag.name}`);
        a.parentElement.nextElementSibling?.remove();
        input.clear();
      });
    } else {
      inputs = inputs.map((input) => {
        if (!input.isValid()) {
          const a = document.querySelector(`#${input.forTag.name}`);
          const err = document.createElement('div');
          err.style.color = 'red';
          err.className = 'error';
          err.innerText = `${input.forTag.label} неверного формата`;
          if (!a.parentElement.nextElementSibling) {
            a.parentElement.parentElement.append(err);
          }
        } else {
          const a = document.querySelector(`#${input.forTag.name}`);
          a.parentElement.nextElementSibling?.remove();
        }
        return input;
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form
          onSubmit={submitForLoginHandler}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            {inputs &&
              inputs.map((input, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    <TextField
                      {...input.forTag}
                      variant="outlined"
                      required
                      fullWidth
                    />
                    <div id="error"></div>
                  </Grid>
                );
              })}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                Еще нет аккаунта? Го регистрироваться
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
