import {useState} from 'react'

const Unit = ({ mouseVal }) => {
  const [unitSelect, setUnitSelect] = useState(false)
  const unitStyle = {margin: '0px',
                    padding: '0px',
                  height: '100%'}

  function unitClick(event) {
    setUnitSelect(!unitSelect);
    if (unitSelect) {
      event.target.style.background = '';
      event.target.classList.toggle('clicked')
    } else {
      event.target.style.background = 'darkslategrey';
      event.target.classList.toggle('clicked')
    }
  }
  function mouseOver(event) {
    console.log(mouseVal)
    console.log(event.button)
    // if (event.target.button) {
    //   console.log("button down!")
    // } else {
    //   console.log("button up")
    // }
  }

  return (
    <div onMouseDown={(e) => unitClick(e)} onMouseOver={(e) => mouseOver(e)} style={unitStyle}>
    </div>
  );
}

export default Unit;