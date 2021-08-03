$(document).ready(function(){
function news() {
    $.ajax({
        type: "GET",
        url: "http://api.mediastack.com/v1/news",
        data: {
            access_key: "4e5a86992a67236383b501c11365f826",
            languages: "en",
            keywords: "comics",
            sort: "published_desc",
            sources: "forbes, gizmodo, times, marvel, mb",
            limit: "18"
        },
        // url: "https://newsapi.org/v2/everything?language=en&q=comic book&from=2021-07-10&to=2021-07-10&sortBy=popularity&apiKey=2dcd34c47f7c4c1d93f8f65be0bfd031",
        success: function(source) {
            var newsbox = $(".main__news");
            newsbox.empty();

            $.each(source.data, function(i,article) {
                console.log(article);
                newsbox.append(`
                <a href="${article.url}">

                
                
                    <div class="news__box">
                        <div class="news__pub">
                            <h5 style="background-color: black; color: white; font-weight: bold;">${article.source}</h5>
                        </div>
                        <div class="news__img-box">
                            <img src="${article.image}" onerror="this.onerror=null; this.src='/img/fr2.jpg'" style="object-fit: cover;" class="img-fluid">
                        </div>
                        <h4 style="margin-bottom: 1rem; font-size: 1.3rem; font-weight: bold; background-color: white; padding: 1rem; border: black solid .1rem;">${article.title}</h4>
                        <p>Read more...</p>
                    </div>

                </a>
                    
                    
                    `)
            })
            console.log(articles);
        }
    })
}
news()
});