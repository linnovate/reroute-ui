import React from 'react';
import Radium from 'radium';


const AnimationDemo = ({ styles, animation }) => {
  const headerStyle = {
    ...(styles[animation]),
    animationDuration: '2s',
    fontSize: 20,
    margin: '30px auto',
    color: '#c43a31'
  };

  // Render a bunch of empty spans so that each keyframe
  // will be available in the DOM.
  let dummies = Object.keys(styles).map(
    key => <span key={key} style={styles[key]} />
  );

  return (
    <div>
    {dummies}
    <div key={animation} style={headerStyle}>effect</div>
    </div>
  );
};

export default Radium(AnimationDemo);