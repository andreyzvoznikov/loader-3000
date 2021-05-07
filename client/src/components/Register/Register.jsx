import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useInput from '../../customHooks/useInput';
import {
  checkEmail,
  checkPassword,
  checkName,
} from '../../helpers/validateFunc';
import { sagaRegisterAC } from '../../redux/actionCreaters/userAC';
import { useEffect } from 'react';

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
    backgroundColor: '#ee82ee'
  },
}));

function Register() {
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
      label: 'Email',
      type: 'email',
      validateFunc: checkEmail,
      name: 'email',
      id: 'email',
      autoComplete: 'email',
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

  const submitFormRegHanlder = (e) => {
    e.preventDefault();
    if (inputs.every((input) => input.isValid())) {
      const formData = Object.fromEntries(new FormData(e.target).entries()); // обращается по name к импутам. В итоге получается объект формата {name: "efe", email: "qwe@qwe.qwefe", password: "qweqwe!@#!@#2131QWEqwe"}
      dispatch(sagaRegisterAC(formData));

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
          Регистрация
        </Typography>
        <form
          onSubmit={submitFormRegHanlder}
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
            Зарегистрироваться
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Уже есть аккаунт? Го логиниться
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Register;
