import { memo } from 'react';
import Link from 'next/link';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const PostContent = ({ postData }) => {
  const classes = useStyles();

  return (
    <Typography>
      {postData.split(/(#[^\s#]+)/g).map((data, index) => {
        if (data.match(/(#[^\s#]+)/)) {
          return (
            <Link
              key={index}
              className={classes.link}
              color="primary"
              href={`/hashtag/${data.slice(1)}`}
            >
              <a>{data}</a>
            </Link>
          );
        }
        return data;
      })}
    </Typography>
  );
};

export default memo(PostContent);
