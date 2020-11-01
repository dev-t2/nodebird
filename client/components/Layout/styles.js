const { fade, makeStyles } = require('@material-ui/core');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  profile: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '20ch',
    '&:focus': {
      width: '28ch',
    },
  },
}));

export default useStyles;
