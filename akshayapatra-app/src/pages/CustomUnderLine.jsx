import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import flowerDecorImage from '../assets/flow-ud-5.webp';
import { ListItemText } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  underlineContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: '1px', // Adjust the height as needed
    backgroundColor: 'lightgrey', // Change the color as needed
    margin: '0 10px', // Adjust the margin as needed
  },
  image: {
    width: '50px', // Adjust the width of the image as needed
    height: 'auto',
    margin: '0 10px', // Adjust the margin as needed
  },
}));

const CustomUnderline = ({ text }) => {
  const classes = useStyles();

  const [underlineWidth, setUnderlineWidth] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // Measure the width of the text element
      const textWidth = textRef.current.offsetWidth;

      console.log("1");
      
      // Set the width of the underline
      setUnderlineWidth(textWidth * 0.4); // 80% of the text width
      console.log(text, underlineWidth);
    }
    console.log("2");
  }, [text]);

  return (
    <div className={classes.underlineContainer}>
      {/* <ListItemText primary={text} ref={textRef} /> */}
      <div className={classes.line} style={{ width: underlineWidth }}></div>
      <img src={flowerDecorImage} alt="flower decor" className={classes.image} />
      <div className={classes.line} style={{ width: underlineWidth }}></div>
    </div>
  );
};

export default CustomUnderline;
