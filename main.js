const API_KEY = `76624313b7a04dffb6f94de1e284955c`
let newsList = []
const getLastestNews = async () => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("ddd",newsList);
};


const render= () => {
    const newsHTML = newsList.map(news=>`<div class="row news">
    <div class="col-lg-4">
    <img class="news-img-size" src="${news.urlToImage}" alt="">
</div>

<div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.description}</p>
    <div>
        ${news.source.name} * ${news.publishedAt}
    </div>
</div>
</div>
</div>
    `).join('');

    document.getElementById('news-board').innerHTML=newsHTML;
}

getLastestNews();
