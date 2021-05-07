import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  let auth = useSelector((state) => state.user.isAuth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/register',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
