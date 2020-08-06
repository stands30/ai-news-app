import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

import wordsToNumbers from 'words-to-numbers';
import ReactGA from 'react-ga';
const alanKey = 'bc27fc3eb5c0624c5435431b17bfff822e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const classes = useStyles();
    const [activeArticle, setActiveArticle] = useState(-1)
    ReactGA.initialize('UA-162979718-2');
    ReactGA.pageview('/');
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number    }) => {
               
                switch (command) {
                    case 'newHeadLines':
                        setNewsArticles(articles);
                        setActiveArticle(-1);
                        break;
                    case 'highlight':
                        setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                        break;
                    case 'open':
                        const parsedNumber = number.length > 2 ? wordsToNumbers(number,{ fuzzy: true}) : number;
                        const article =articles[parsedNumber - 1];
                        if(parsedNumber > 20){
                            alanBtn().playText('Please try again');
                        }
                        else if(article){
                            window.open(article.url,'_blank');
                            alanBtn().playText('Opening');
                        }
                        break; 
                    default:
                        break;
                }
            }
        });
    }, []);
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="alan logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App;