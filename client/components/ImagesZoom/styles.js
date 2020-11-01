const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles((theme) => ({
  dialog: {
    '& .MuiDialog-paperScrollPaper': {
      height: '100%',
    },
  },
  close: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },

  slider: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'hidden',

    '& div': {
      height: '100%',
      outline: 'none',
    },

    '& img:focus': {
      outline: 'none',
    },

    '& .slick-slide img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },

    '& .slick-dots': {
      bottom: 0,
      left: 0,
      paddingBottom: theme.spacing(1),
    },
  },
}));

export default useStyles;
