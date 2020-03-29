import React from 'react';

const buttonClicker = (props) => {
  const inputstyle = {
    width: '30.5%',
    height: 25,
    margin: 2
    
  };

  return (<button
  	style= {inputstyle}
  	onClick={props.clicked}>
	Click to load Log
  	</button>
  	);
};

export default buttonClicker;