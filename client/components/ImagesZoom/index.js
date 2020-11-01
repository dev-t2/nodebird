import { memo } from 'react';

import { Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import useStyles from './styles';

const ImagesZoom = ({ open, images, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog className={classes.dialog} fullWidth maxWidth={false} open={open} onClose={onClose}>
      <DialogTitle onClose={onClose}>
        <IconButton className={classes.close} aria-label="close" onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Slider dots className={classes.slider}>
          {images.map((image) => (
            <div key={image.src}>
              <img src={`${image.src.replace('//thumb//', '/original/')}`} alt={image.src} />
            </div>
          ))}
        </Slider>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ImagesZoom);
