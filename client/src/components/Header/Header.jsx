import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAC } from '../../redux/actionCreaters/userAC';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#00d1b2',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

function Header() {
  const classes = useStyles();
  const { name, isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const logOutHanler = async () => {
    const response = await fetch('http://localhost:4000/logout', {
      credentials: 'include',
    });
    if(response.status === 200) {
      dispatch(logoutAC())
    }
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Загружатор-3000
            </Link>
          </Typography>
          {isAuth ? (
            <>
              <Link to="/lk" className={classes.link}>
                <Button color="inherit">Личный кабинет: {name}</Button>
              </Link>
              <Button color="inherit" onClick={logOutHanler}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className={classes.link}>
                <Button color="inherit">Вход</Button>
              </Link>
              <Link to="/register" className={classes.link}>
                <Button color="inherit">Регистрация</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
