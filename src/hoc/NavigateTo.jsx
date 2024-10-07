import React from "react";
import { useNavigate } from "react-router-dom";

const NavigateTo = ({ to = "/home" }) => {
  const navigate = useNavigate();

  navigate(to);

  return <></>;
};

export default NavigateTo;
