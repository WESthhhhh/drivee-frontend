import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Button from "./components/UI/button";
import star from "./assets/star.png";
import arrow from "./assets/arrow.png";
import add from "./assets/add.png";
// import Navbar from "./components/layouts/navbar";
import {
  PrimaryInput,
  SecondaryInput,
  DisableInput,
  TextArea,
  FileInput,
} from "./components/formInputs";
import ProfilDropdown from "./components/UI/profildropdown";
import UserType from "./components/UI/userType";
import RadioButton from "./components/UI/radioButton";



function App() {
  return (
    <>
    <Router>
      <Button Children="buttom" type="primary" />
      <Button Children="buttom" type="primary" icon={star} />
      <Button Children="buttom" disabled />
      <Button Children="buttom" disabled icon={star} />
      <Button Children="buttom" type="secondary" />
      <Button Children="buttom" type="secondary" disabled />
      <Button Children="buttom" type="ghost" />
      <Button Children="buttom" type="ghost" disabled />
      <Button icon={arrow} type="primary" />
      <Button icon={add} type="primary" />
      <Button icon={add} disabled />
      <div className="container mx-auto p-8">
        
        <h2 className="text-5xl font-bold mb-6 font-poppins">form inputs</h2>
        <from className="w-[500px]">
          <PrimaryInput label="Primary Input" placeholder="Enter your name" />
          <SecondaryInput
            label="Secondary Input"
            placeholder="Enter your email"
          />
          <DisableInput
            label="Disabled Input"
            placeholder="This input is disabled"
          />
          {/*
          <PrimaryInput label="Primary Input" placeholder="Enter your name" error="message error"/> 
          <PrimaryInput label="Primary Input" placeholder="Enter your name" succes="message success"/>
          */}
          <FileInput label="file" />
          <TextArea label="Textarea" placeholder="Enter your message" />

          <Button Children="submit" type="primary" />
        </from>
        <ProfilDropdown/>
        <UserType type="Learner"/>
        <RadioButton label="checked"/>
      </div>
      </Router>
    </>
  );
}

export default App;
 