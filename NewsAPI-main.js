const API_KEY = `76624313b7a04dffb6f94de1e284955c`
let newsList = []
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener("click",(event)=> getNewsByCategory(event)))

const getNews = async () => {
    try {
        const response = await fetch(url);
        console.log("rrr",response);
        const data = await response.json();
        if(response.status===200) {
            if(data.articles.length === 0) {
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            render();
        }else {
            throw new Error(data.message);
        }
    } catch (error) {
        errorRender(error.message)
    }
};

let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);

const getLastestNews = async () => {
    url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
    getNews();
};


const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}
    `);
    getNews();
};


const getNewsByKeyword = async ()=> {
    const keyword = document.getElementById("search-input").value;
    url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
    getNews();
};



const render= () => {
    const newsHTML = newsList.map(news=>`<div class="row news">
    <div class="col-lg-4">
    <img class="news-img-size" src="${news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}" alt="">
</div>

<div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.description == null || news.description ==""
            ? "내용없음"
            : news.description.length >200
            ? news.description.substring(0,200) + "..."
            : news.description   
    }</p>
    <div>
        ${news.source.name || "no source"} * ${moment(news.publishedAt).format('Do MMMM YYYY')} * ${moment(news.publishedAt).startOf('hour').fromNow()}
    </div>
</div>
</div>
</div>
    `).join('');

    document.getElementById('news-board').innerHTML=newsHTML;
};



const errorRender = (errorMessage)=> {
    const errorHTML = `<div class="alert alert-danger" role="alert">
        ${errorMessage}
        </div>`;

    document.getElementById("news-board").innerHTML = errorHTML;
};


getLastestNews();


//1. 버튼들에 클릭 이벤트 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기 render



