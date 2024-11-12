import React from "react";
import { Spinner as Loader } from "react-bootstrap";
const spinnerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
};
function Spinner() {
    return <Loader style={spinnerStyle} animation="border" variant="primary" />;
}

export default Spinner;
