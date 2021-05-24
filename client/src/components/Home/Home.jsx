import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography variant="h1" component="h2">
        Загружатор
      </Typography>
      <Typography variant="h1" component="h2">
        три
      </Typography>
      <Typography variant="h1" component="h2">
        тысячи
      </Typography>
    </div>
  );
}

export default Home;
