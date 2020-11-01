const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  form: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  div: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;
