const API_KEY = `76624313b7a04dffb6f94de1e284955c`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu => menu.addEventListener("click",(event)=> getNewsByCategory(event)));
let url = new URL(`https://stunning-speculoos-2783a5.netlify.app/top-headlines`);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;




const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };


  const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };








const getNews = async () => {
    try {
        url.searchParams.set("page",page);
        url.searchParams.set("pageSize",pageSize);

        const response = await fetch(url);
        
        console.log("rrr",response);
        const data = await response.json();
        if(response.status===200) {
            if(data.articles.length === 0) {
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            paginationRender();
        }else {
            throw new Error(data.message);
        }
 
    } catch (error) {
        errorRender(error.message)
    }   
};





const getLastestNews = async () => {
    url = new URL(
        `https://stunning-speculoos-2783a5.netlify.app/top-headlines`
        );
    getNews();
    console.log("ddd",newsList);
};


const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    url = new URL(`https://stunning-speculoos-2783a5.netlify.app/top-headlines?category=${category}
    `);
    getNews();
};


const getNewsByKeyword = async ()=> {
    const keyword = document.getElementById("search-input").value;
    console.log("keyword:",keyword);
    url = new URL(`https://stunning-speculoos-2783a5.netlify.app/top-headlines?q=${keyword}`);
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
}


const errorRender = (errorMessage)=> {
    const errorHTML = `<div class="alert alert-danger" role="alert">
        ${errorMessage}
        </div>`;

    document.getElementById("news-board").innerHTML = errorHTML;
};





const paginationRender = ()=> { 
   
    const totalPages = Math.ceil(totalResults/pageSize);
    const pageGroup = Math.ceil(page/groupSize);
    
    let lastPage = pageGroup * groupSize;
    
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }

    const firstPage = lastPage - (groupSize -1) <= 0 ? 1: lastPage - (groupSize -1);

    let paginationHTML =''

    if(page < 6 && page >1) {
        paginationHTML = `<li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link">Previous</a></li>`
    }

    if(firstPage >= 6) {
        paginationHTML = `<li class="page-item" onclick="moveToPage(1)"><a class="page-link">First Page</a></li>
                            <li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link">Previous</a></li>`     
    }
        
    for(let i = firstPage; i <= lastPage;i++) {
        paginationHTML += `<li class="page-item ${i===page ? "active" : ""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
    
    if(lastPage < totalPages) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link">Next</a></li>
                        <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link">Last Page</a></li>`
    }

        
    document.querySelector(".pagination").innerHTML = paginationHTML
};  
 

const moveToPage = (pageNum) => {
    console.log("movetopage",pageNum);
    page = pageNum;
    getNews();
};


getLastestNews();


