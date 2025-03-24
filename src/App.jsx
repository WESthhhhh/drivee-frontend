import React from "react";
import Button from "./components/button";
import star from "./assets/star.png"
import arrow from "./assets/arrow.png"
import add from "./assets/add.png"
import Inputs from "./components/Inputs";


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
      <div className="container mx-auto p-8">
      {/* Your existing button code */}
      
      <h2 className="text-2xl font-bold mb-6">Form Inputs</h2>
      <Inputs />
    </div>
    

    </>
  );
}

export default App;
