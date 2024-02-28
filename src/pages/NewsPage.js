import React from "react";
import { useState, useEffect } from "react";
import NewsBox from "../components/NewsBox";
import Header from "../components/Header"
import Button from "../components/Button"
import PageHeader from "../components/PageHeader";
import '../components/PageHeader.css';
import '../components/NewsPage.css';

function NewsPage() {

    const [cards, setCard] = useState([]);
    const news = []
    
    useEffect(() => {
        fetch('/news')
        .then(res => res.json())
        .then(data => {setCard(data);});
    }, []);
    for(const i in cards.titles) {
    news.push(
        <NewsBox
            imgSrc = {cards.urlToImages[i]}
            link = {cards.urls[i]}
            description = {cards.descriptions[i]}
            title = {cards.titles[i]}
            buttonText= 'Read More'

        />
    )
    }
    return(
    <>
        <div>
            <Header />
        </div>
        <div>
            <h1 className = 'news-header'>News</h1>
        </div>
        <div>
            <span className = "all-news">
                {news}
            </span>
        </div>
    </>
    )
}

export default NewsPage