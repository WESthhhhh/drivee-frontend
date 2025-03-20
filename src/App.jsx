import React from "react";
import Button from "./components/button";
import star from "./assets/star.png"
import arrow from "./assets/arrow.png"
import add from "./assets/add.png"



// adapte le chemin selon ta structure


function App() {
  return (
    <>
      <Button Children="buttom" type="primary"/>
      <Button Children="buttom" type="primary" icon={star} />
      <Button Children="buttom" disabled />
      <Button Children="buttom" disabled icon={star} />
      <Button Children="buttom" type="secondary"/>
      <Button Children="buttom" type="secondary" disabled/>
      <Button Children="buttom" type="ghost"/>
      <Button Children="buttom" type="ghost" disabled/>
      <Button icon={arrow}  type="primary" />
      <Button icon={add}  type="primary" />
      <Button icon={add}  disabled />
    </>
  );
}

export default App;
