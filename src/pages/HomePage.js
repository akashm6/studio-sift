import React from "react";
import Header from '../components/Header';
import '../components/HomePage.css'
import Button from '../components/Button'

function HomePage() {

    return (
        <div className = "main">
        <h1 className = "maintext">Welcome to StudioSift </h1>
        <div className = 'buttonContainer'>
        <Button 
            link = '/news'
            text = 'News'
        />
        <Button
            link = '/about'
            text = 'About'
        />
        <Button
            link = '/search'
            text = 'Studio Search'
        />
        <Button
            link = '/statistics'
            text = 'Statistics'
        />
        <h3><a href='https://github.com/AkashMohan7' style = {{position:'absolute',bottom: '10%',left: '45.7%', fontFamily: "Poppins", color: 'white'}}>Built by: Akash Mohan</a></h3>
        </div>
        
        </div>
    )
}

export default HomePage