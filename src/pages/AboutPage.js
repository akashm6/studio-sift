import React from "react";
import Header from "../components/Header";
import PageHeader from "../components/PageHeader";
import '../components/AboutPage.css'
import css from '../icons/csslogo.png'
import flask from '../icons/flasklogo.png'
import html from '../icons/htmllogo.png'
import js from '../icons/jslogo.png'
import python from '../icons/pythonlogo.png'
import react from '../icons/react.png'

function AboutPage() {

    return(
    <>
        <div>
            <Header 
            />
        </div>
        <div>
        <h1 className = 'about-main'>About</h1>
        </div>
        <p className = 'p1'>
            What is Studiosift?
        </p>
        <p className = 'p2'>
            As the world of video games continues to expand,<br></br> the number of game developers and production <br></br>studios 
            continue to rise. StudioSift is the best way <br></br>to explore this world, offering seamless categorization<br></br>
            and analytical searching for the majority<br></br> of major game studios/developers.  
        </p>
        <p className = 'p3'>
            Why?
        </p>
        <p className = 'p4'>
        The gaming industry is <span className = 'word'>dynamic</span> and <span className = 'word'>constantly evolving.</span>
        <br></br> Announcements, releases, 
        developments, sales, you name it.<br></br>
        As a gaming enthusiast, I created StudioSift with the <br></br> 
        intention of providing a <span className = 'word'><strong>centralized</strong></span> platform 
        for enthusiasts, gamers, <br></br>and industry professionals
         alike to easily access <br></br>studio information that can otherwise be difficult to find. 
        </p>
        <p className = 'p5'>Stack</p>
        <div class="row">
            <div class="column">
            <a href = 'https://www.python.org/'><img src= {python} style={{width:"8%"}}></img></a>
            <a href = 'https://developer.mozilla.org/en-US/docs/Web/CSS'><img src={css} style={{width:"9%"}}></img></a>
            <a href = 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics'><img src= {html} style={{width:"9%"}}></img></a>
            <a href = 'https://react.dev/'><img src= {react} style={{width:"9%"}}></img></a>
            <a href = 'https://www.javascript.com/'><img src= {js} style={{width:"9%", paddingLeft: '30px'}}></img></a>
            <a href = 'https://flask.palletsprojects.com/en/3.0.x/'><img src= {flask} style={{width:"9%", paddingLeft: '45px'}}></img></a>
            </div>
        </div>


            
    </>     
    );
}

export default AboutPage