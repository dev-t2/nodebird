const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    flexGrow: 1,
    margin: theme.spacing(2),
    maxWidth: '960px',
  },
  textField: {
    padding: theme.spacing(0, 2),
  },
  div: {
    margin: theme.spacing(1, 2, 2, 4),
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    display: 'none',
  },
  icon: {
    padding: 0,
  },
  container: {
    padding: theme.spacing(0, 3, 3),
  },
  imagePath: {
    padding: theme.spacing(1),

    '& img': {
      objectFit: 'contain',
    },
  },
  action: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(1, 0, 0),
  },
}));

export default useStyles;
