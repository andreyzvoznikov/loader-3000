import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import Register from './components/Register/Register';
import LK from './components/LK/LK';
import { useDispatch, useSelector } from 'react-redux';
import { registerAC } from './redux/actionCreaters/userAC';
import ModaleDelete from './components/ModalDelete/ModalDelete';
import ModaleEdit from './components/ModalEdit/ModalEdit';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Pangolin', 'cursive'].join(','),
  },
});

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:4000/checkAuth', {
        credentials: 'include',
      });
      if (response.status === 200) {
        const serverResponse = await response.json();
        dispatch(registerAC(serverResponse.name));
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
      <ModaleDelete />
      <ModaleEdit />
        <Switch>
          <PrivateRoute path="/lk">
            <LK />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
