import { useState } from 'react';

function Inputs() {
  const [inputs, setInputs] = useState({
    one: '',
    two: '',
    three: '',
  });

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  return (
    <>
      <input type="text" name="one" onChange={handleInputs}></input>
      <input type="text" name="two" onChange={handleInputs}></input>
      <input type="text" name="three" onChange={handleInputs}></input>
    </>
  );
}

export default Inputs;
