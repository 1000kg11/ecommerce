// import React from 'react'
// import { Button } from 'antd'

// const ButtonComponent = ({size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
//   return (
//     <Button 
//       style= {{
//         ...styleButton,
//         background: disabled ? '#ccc' : styleButton.background
//       }}
//       size={size} 
//       {...rests}
//       >
//         <span style={styleTextButton}>{textButton}</span>
//     </Button>
//   )
// }

// export default ButtonComponent

import React from 'react';
import { Button } from 'antd';

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disabled, ...rests }) => {
  const background = styleButton && styleButton.background ? styleButton.background : 'defaultColor'; // Giá trị mặc định nếu không có background

  return (
    <Button 
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : background
      }}
      size={size} 
      {...rests}
    >
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
