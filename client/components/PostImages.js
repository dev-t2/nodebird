import { memo, useCallback, useState } from 'react';

import { Button, CardMedia, makeStyles } from '@material-ui/core';

import ImagesZoom from './ImagesZoom';

const useStyles = makeStyles((theme) => ({
  image: {
    padding: theme.spacing(1),

    '& > img': {
      width: '100%',
      height: '400px',
      objectFit: 'contain',
    },
  },

  images: {
    display: 'flex',
    padding: theme.spacing(0, 1),
    '& > img': {
      margin: theme.spacing(0, 1),
      width: '50%',
      height: '400px',
      objectFit: 'contain',
    },
  },

  button: {
    margin: theme.spacing(0, 1),
    width: '50%',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const classes = useStyles();

  const onClick = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <div className={classes.image}>
          <CardMedia
            component="img"
            image={`http://localhost:3065/${images[0].src}`}
            role="presentation"
            onClick={onClick}
          />
        </div>

        <ImagesZoom open={showImagesZoom} images={images} onClose={onClose} />
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <div className={classes.images}>
          <CardMedia
            component="img"
            image={`http://localhost:3065/${images[0].src}`}
            role="presentation"
            onClick={onClick}
          />
          <CardMedia
            component="img"
            image={`http://localhost:3065/${images[1].src}`}
            role="presentation"
            onClick={onClick}
          />
        </div>

        <ImagesZoom open={showImagesZoom} images={images} onClose={onClose} />
      </>
    );
  }

  return (
    <>
      <div className={classes.images}>
        <CardMedia
          component="img"
          image={`http://localhost:3065/${images[0].src}`}
          role="presentation"
          onClick={onClick}
        />
        <Button className={classes.button} aria-label="more" role="presentation" onClick={onClick}>
          {`${images.length - 1}개의 사진 더보기`}
        </Button>
      </div>

      <ImagesZoom open={showImagesZoom} images={images} onClose={onClose} />
    </>
  );
};

export default memo(PostImages);
