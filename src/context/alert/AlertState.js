import alertContext from "./alertContext";
import { useState } from "react";

const AlertState = (props) => {
    const [alert, setalert] = useState({type: "", msg: ""})
    const [display, setdisplay] = useState("none")

    const capitalize = (word) => {
      if(word === "danger") word="error";
      if(word.length !== 0)
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }

    const showAlert = (currentAlert) => {
        setalert({
            type: currentAlert.type,
            msg: currentAlert.msg
        });
        setdisplay("block");
        setTimeout(() => {
            setdisplay("none")
        }, 1500);
    }
  return (
    <alertContext.Provider value={{showAlert}}>
      {alert && <div className={`alert alert-${alert.type}`} role="alert" style={{display: display}}>
        <strong>{capitalize(alert.type)}</strong>: {alert.msg}
      </div>}
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
