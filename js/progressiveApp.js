

window.addEventListener('load', start_app);

const headlines_element = document.querySelector('#headlines');

function start_app() {

    fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=5476c880a7564a9db31b178fb9b5cc00")
        .then(function (data) {
            return data.json();
        })

        .then(function (json) {

            display_news(json.articles.slice(0, 5), headlines_element);
        })

        .catch(function (err) {

            if (err) throw err;
        });

    instalServiceWorkerAsync();
}


function display_news(data, section) {

    if (!data) {

        alert("No articles try again later");
        return;
    }

    data.forEach(function (article) {

        const article_element = document.createElement('div');
        article_element.classList.add('article');

        if (article.urlToImage != null) {

            const article_img = document.createElement('img');
            article_img.setAttribute('src', article.urlToImage);
            article_img.classList.add('article__img');
            article_element.appendChild(article_img);

        }

        const article_title = document.createElement('h3');
        article_title.classList.add('article__title');

        const title = document.createTextNode(article.title);

        article_title.appendChild(title);
        article_element.appendChild(article_title);

        section.appendChild(article_element);


    });
}


async function instalServiceWorkerAsync() {

    if ('serviceWorker' in navigator) {

        try {

            let serviceWorker = await navigator.serviceWorker.register('/sw.js');

        } catch (error) {

            console.error(`Failed to register service worker: ${error}`);
        }
    }
}