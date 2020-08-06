import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

import wordsToNumbers from 'words-to-numbers';
import ReactGA from 'react-ga';
const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const classes = useStyles();
    const [activeArticle, setActiveArticle] = useState(-1)
    ReactGA.initialize('UA-162979718-2');
    ReactGA.pageview('/');
    useEffect(() => {
        alanBtn({
          key: '64370f4c903e66c5b517887fefa45c1b2e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: ({ command, articles, number }) => {
            if (command === 'newHeadlines') {
              setNewsArticles(articles);
              setActiveArticle(-1);
            } else if (command === 'highlight') {
              setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === 'open') {
              const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
              const article = articles[parsedNumber - 1];
    
              if (parsedNumber > 20) {
                alanBtn().playText('Please try that again...');
              } else if (article) {
                window.open(article.url, '_blank');
                alanBtn().playText('Opening...');
              } else {
                alanBtn().playText('Please try that again...');
              }
            }
          },
        });
      }, []);
    return (
        <div>
            <div className={classes.logoContainer}>
                {/* <img src={logoImg} className={classes.alanLogo} alt="" /> */}
                 <span className={classes.alanLogo}>Schbang</span>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            <div className={classes.footer}>
                <p>Developed by stanley dsouza</p>
            </div>
        </div>
    );
}

export default App;