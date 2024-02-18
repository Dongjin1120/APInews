const API_KEY = `76624313b7a04dffb6f94de1e284955c`
let newsList = []
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu => menu.addEventListener("click",(event)=> getNewsByCategory(event)))

const getLastestNews = async () => {
    const url = new URL(
        `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
        );
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("ddd",newsList);
};


const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?category=${category}
    `);
    const response = await fetch(url);
    const data = await response.json();
    console.log("DDDD",data)
    newsList = data.articles;
    render();
};


const getNewsByKeyword = async ()=> {
    const keyword = document.getElementById("search-input").value;
    console.log("keyword:",keyword);
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=${keyword}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log("search data", data);
    newsList = data.articles;
    render();
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
}

getLastestNews();


//1. 버튼들에 클릭 이벤트 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기 render



