shopCount = 0;
var max = 27;
var min = 0;
var bookTotal = 0;

function randomizer() {
    var banner = $(".header__banner-img");
    
    var backgrounds = ["/img/Fantasy Road banner 5 - new and preowned coic book sales, pressing and cleaning services, middleman services.jpg","/img/Fantasy Road banner 4 - new and preowned coic book sales, pressing and cleaning services, middleman services.jpg","/img/Fantasy Road banner 3 - new and preowned coic book sales, pressing and cleaning services, middleman services.jpg","/img/Fantasy Road banner 2 - new and preowned coic book sales, pressing and cleaning services, middleman services.jpg", "/img/Fantasy Road banner 1 - new and preowned coic book sales, pressing and cleaning services, middleman services.jpg"]
    var random = getRandom(4)
    var background = backgrounds[random]
    function getRandom(max) {
       return Math.floor(Math.random() * max);
    }
    banner.attr('src', background);
    console.log(background);
    
}


//modal 
// Get the modal
var modal = $(".modal");

// Get the button that opens the modal
var formBtn = $("#formBtn");

// Get the <span> element that closes the modal
var span = $(".close");

// When the user clicks on the button, open the modal

formBtn.on("click", function() {
    modal.show();
    console.log("working");
  }) 

// When the user clicks on <span> (x), close the modal
span.on("click", function() {
    modal.hide();
  })


// When the user clicks anywhere outside of the modal, close it
$("body").on("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})
//

function template(comic) {
    
    function shippingCalc(comic) {
                        
        if (comic.weight < 500) {
            return 1.80;
        } else if (comic.weight >= 500 && comic.weight < 2000) {
            return 4.99;
        } else if (comic.weight >= 2000 && comic.weight < 5000) {
            return 9.99;
        }
    }
    var list = $("#comic__modern-list");
                    
    
                    list.append(`
                    <div class="comic__box">
                    <div class="comic__image-box">
                    <div class="${comic['run']}" style="display: none"><p class="yes-run">RUN</p></div> 
                    <div class="${comic['type']}" style="display: none"><p class="TPB-run">TPB</p></div>
                    <a href="${comic['enlarge']}" data-lightbox="${comic['id']}" data-title="${comic['data-item-name']}"><img src="${comic['data-item-image']}" alt="${comic['data-item-name']}" class="img-fluid"></a>
                    <div class="comic__desc-wrap snipcart-add-item" data-item-id="${comic['id']}" 
                    data-item-price="${comic['price']}" 
                    data-item-url="/comics.json" 
                    data-item-description="${comic['data-item-description']}" 
                    data-item-image="${comic['data-item-image']}" 
                    data-item-name="${comic['data-item-name']}">
                    <a href="${comic['enlarge']}" data-lightbox="${comic['id']}" data-title="${comic['data-item-name']}"><div class="comic__desc" style="color:white">${comic['data-item-description']}, issue #${comic['issue']} (${comic['year']}) <br> £${comic['price']}</div></a>
                    </div>
                    </div>
                   
                    
                       
                    <div style="text-align:center; margin-top: .5rem;">


                    <button 
                                   class="snipcart-add-item comic__button" style="text-align:center; width: 100%; border: none; background-color: orange; font-weight: bold;" 
                                   data-item-id="${comic['id']}" 
                                   data-item-price="${comic['price']}" 
                                   data-item-url="/comics.json" 
                                   data-item-description="${comic['data-item-description']}" 
                                   data-item-image="${comic['data-item-image']}"
                                   data-item-weight="${comic.dimensions['weight']}"
                                   data-item-name="${comic['data-item-name']}"> 
                                   <div class="comic__desc-desk"> Add to cart £${comic['price']}</div><div class="comic__desc-mob" style="padding: .5rem">BUY £${comic['price']} <br> ${comic['data-item-description']}, Issue: ${comic['issue']} (${comic['year']})</div>
                    </button>
                    

                    </div>  
                        `) 
                        shopCount++
                        console.log(shopCount)
} 



function shippingCalc(comic) {
                        
    if (comic.weight < 500) {
        return 1.80;
    } else if (comic.weight >= 500 && comic.weight < 2000) {
        return 4.99;
    } else if (comic.weight >= 2000 && comic.weight < 5000) {
        return 9.99;
    }
}

$(document).ready(function(){
var search = ""
var pubfilt = ""
var age = ""
var frontNew = $("#comic__list-new");
var frontSale = $("#comic__list-sale")

$("body").on("click", ".comic__nav-buttons-reset", function() {
    age = "";
    search = "";
    pubfilt = "";
    $(".comic__nav-buttons-age").removeClass("current-age");
    $(".comic__nav-buttons").removeClass("current");
    $(".comic__nav-buttons-pub").removeClass("current-pub");
    max = 27;
    update()
    Loadmore()
    
    
})

$("body").on("click", ".comic__nav-buttons", function() {
    $(".comic__nav-buttons").removeClass("current");
    search = this.id;
    console.log(search);
    max = bookTotal;
    loadMore()
    update()
    $(this).addClass("current");


})

$("body").on("click", ".comic__nav-buttons-pub", function() {
    $(".comic__nav-buttons-pub").removeClass("current-pub");
    $(".comic__nav-buttons").removeClass("current");
    pubfilt = this.id.toLowerCase();
    search = ""
    update();
    $(this).addClass("current-pub");
    max = bookTotal;
    loadMore()
})

$("body").on("click", ".comic__nav-buttons-age", function() {
    $(".comic__nav-buttons-age").removeClass("current-age");
    $(".comic__nav-buttons").removeClass("current");
    age = this.id.toLowerCase();
    search = ""
    max = bookTotal;
    loadMore()
    update();
    $(this).addClass("current-age");
})

$("body").on("click", ".comic__nav-buttons-show-box", function() {
    var text = $("comic__nav-buttons-show").text;
    $(".comic__nav-box").toggleClass("mob-hide");
    console.log(text)
    if (text == "show filters" ) {
        $(text).text("Hide Filters");
    } else {
        $(text).val("Show Filters");
    }
})

function loadMore() {
    var list = $("#comic__modern-list");
    if (max < bookTotal) {
        
        list.append(`
        <button class="comic__loadMoreBtn btn-warning btn" style="width: 100%; position: absolute; bottom: 0; background-color: orange;">LOAD MORE</button>
    `);
    }
}

$("body").on("click", ".comic__loadMoreBtn", function() {
    if (bookTotal > max) {
        max += 27;
        update();
        greyout()
    }
})

//comic nav button render and function
var alph = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var pub = ["Marvel", "DC", "Vertigo", "Wildstorm", "Image", "Avatar", "Dynamte", "Icon", "MAX", "Dark Horse"]
var ages = ["Modern", "Bronze", "Silver", "Gold"]

$.each(ages, function(index, value) {
    var list = $(".comic__nav-buttons-age-box");
        list.append(`
            <button id="${value.toLowerCase()}" class="btn btn-warning comic__nav-buttons-age">${value}</button>
            `)   
});
$.each(pub, function(index, value) {
    var list = $(".comic__nav-buttons-pub-box");
        list.append(`
            <button id="${value}" class="btn btn-warning comic__nav-buttons-pub">${value}</button>
            `)   
});
$.each(alph, function(index, value) {
    var list = $(".comic__nav-buttons-box");
        list.append(`
            <button id="${value}" class="btn btn-warning comic__nav-buttons">${value.toUpperCase()}</button>
            `)   
});

function none() {
    var list = $("#comic__modern-list");
                    list.append(`
                        <div class="comic__no-result">
                        <h3 class="comic__no-result-txt">NO RESULTS FOUND</h3>
                        </div>
                        `)   
} 

function update() {
    $.ajax({
        type: "GET",
        url: "/comics.json",
        contentType: "application/json",
        success: function(inventory) {
        var list = $("#comic__modern-list");
            list.empty();
        $.each(inventory, function(i, comic) {
            var publisher = comic.publisher.toLowerCase();
            var issue = comic.issue.toLowerCase();
            var name = comic.series.toLowerCase();
            var currentObject = comic;
            // var type = comic.type.toLowerCase()
            var year = comic.year; 
            var type = ageSort(currentObject)
            

    
    
    function ageSort(currentObject) {
        
        if (currentObject.year >= 1985) {
            return "modern";
        } else if (currentObject.year < 1985 && year >= 1970) {
            return "bronze"; 
        } else if (currentObject.year < 1970 && year >= 1956 ) {
            return "silver";
        } else if (currentObject.year < 1956) {
            return "gold";
        }
    }
    bookTotal = inventory.length;
if (i >= min && i <= max) {
    if (age == '') {
        if (pubfilt == '') {
            if (search == '') {
                template(currentObject)
            } else if (search.includes(publisher) 
            || search.includes(issue) 
            || name.startsWith(search)) {
               template(currentObject)
            }
                
        } else if (pubfilt) {
            if (publisher == pubfilt) {
                if (search == "") {
                    template(currentObject)
                } else if (search.includes(publisher) && publisher == pubfilt
                || search.includes(issue) && publisher == pubfilt
                || name.startsWith(search) && publisher == pubfilt) {
                   template(currentObject)
        
                } 
                
            }
        }  
        
    } else if (age) {
        if (type == age) {
            if (pubfilt == "") {
                if (search == "") {
                    template(currentObject)
            } else if (search.includes(publisher) && publisher == pubfilt
            || search.includes(issue) && publisher == pubfilt
            || name.startsWith(search) && publisher == pubfilt) {
               template(currentObject)
    
            }
            } else if (pubfilt) {
                if (publisher == pubfilt) {
                    if (search == "") {
                        template(currentObject)
                    } else if (search.includes(publisher) && publisher == pubfilt
                    || search.includes(issue) && publisher == pubfilt
                    || name.startsWith(search) && publisher == pubfilt) {
                       template(currentObject)
            
                    }
                    
                }
            }
            
    } 
    
}
}
    
    
})
loadMore()
    if (list.children().length <= 0) {
        none()
    }
        }
    })

    
}

function getbooks() {
    $.ajax({
        type: "GET",
        url: "/comics.json",
        contentType: "application/json",
        success: function(inventory) {
            
            var counter = 0;
            $.each(inventory, function(i, comic) {
                var filter = comic.label;
                if (counter < 6) {
                    frontNew.prepend(`
                        <div class="comic__box n${comic['stock']}ne">
                        <div class="comic__image-box">
                        <div class="${comic['run']} " style="display: none"><p class="yes-run">RUN</p></div> 
                        <div class="${comic['type']}" style="display: none"><p class="TPB-run">TPB</p></div>
                        <a href="${comic['enlarge']}" data-lightbox="${comic['id']}" data-title="${comic['data-item-description']}, issue ${comic['issue']} ${comic['year']} "><img src="${comic['data-item-image']}" alt="${comic['data-item-description']}" class="img-fluid"></a>
                        <div class="comic__desc-wrap">
                        <a href="${comic['enlarge']}" data-lightbox="${comic['id']}" data-title="${comic['data-item-name']}"><div class="comic__desc" style="color:white">${comic['data-item-description']}, issue #${comic['issue']} (${comic['year']})</div></a>
                        </div>
                        </div>
                        <button 
                               class="snipcart-add-item comic__button btn btn-warning" style="text-align:center; width: 100%; border: none; font-weight: bold;" 
                               data-item-id="${comic['id']}" 
                               data-item-price="${comic['price']}" 
                               data-item-url="/comics.json"
                               data-item-description="${comic['data-item-description']}" 
                               data-item-image="${comic['data-item-image']}"
                               data-item-weight="${comic.dimensions['weight']}"
                               data-item-custom3-name=""
                               data-item-custom3-type="readonly"
                               data-item-custom3-value="If you would like to purchase additional services with your order, please select from the below. Pricing for these can be found on our services page - and if selected, a member of the team will be in contact as soon as possible. Please note: Service selection will not add a charge to your purchase - A member of the team will contact you to go through your requirements, and once agreed, a payment link will be generated."
                            
                               data-item-custom1-name="Pressing and cleaning - please refer to the services page for costs."
                               data-item-custom1-type="checkbox"
                               data-item-custom2-name="CGC Submission - please refer to the services page for costs."
                               data-item-custom2-type="checkbox"
                               data-item-name="${comic['data-item-name']}"> 
                               
                               <div class="comic__desc-desk"> Add to cart £${comic['price']}</div><div class="comic__desc-mob" style="padding: 0">£${comic['price']} <br> Add to cart </div>
                            </button>
                        </div>
                        `)   
                        if (filter == "sale") {
                            frontSale.append(`
                            <div class="comic__box-sale">
                            <div class="comic__image-box">
                            <div class="${comic['run']}" style="display: none"><p class="yes-run">RUN</p></div> 
                            <div class="${comic['type']}" style="display: none"><p class="TPB-run">TPB</p></div>
                            <a href="${comic['enlarge']}" data-lightbox="${comic['data-item-id']}" data-title="${comic['data-item-name']}"><img src="${comic['data-item-image']}" alt="${comic['data-item-description']}" class="img-fluid"></a>
                            <div class="comic__desc-wrap">
                            <a href="${comic['enlarge']}" data-lightbox="${comic['id']}" data-title="${comic['data-item-name']}"><div class="comic__desc" style="color:white">${comic['data-item-description']}, issue #${comic['issue']} (${comic['year']})</div></a>
                            </div>
                            </div>
                            <div style="text-align:center">
                            <button 
                                   class="snipcart-add-item comic__button" style="text-align:center; width: 100%; border: none; background-color: orange; font-weight: bold;" 
                                   data-item-id="${comic['id']}" 
                                   data-item-price="${comic['price']}" 
                                   data-item-url="/comics.json" 
                                   data-item-description="${comic['data-item-description']}" 
                                   data-item-image="${comic['data-item-image']}"
                                   data-item-weight="${comic.dimensions['weight']}"
                                   data-item-name="${comic['data-item-name']}"> 
                                    <div class="comic__desc-desk"> Add to cart <span style="text-decoration: line-through">£${comic['sale-price']}</span> <span style="color: red">£${comic['price']}</span></div><div class="comic__desc-mob" style="padding: .5rem"> <span style="color: red; text-decoration: line-through">£${comic['sale-price']}</span><br>£${comic['price']} <br>Add to cart</div>
                            </button>
                            </div>
                            </div>
                            `)   
                        }
                } else if (filter == "sale"){
                    frontSale.append(`
                            <div class="comic__box-sale">
                            <div class="comic__image-box">
                            <div class="${comic['run']}" style="display: none"><p class="yes-run">RUN</p></div> 
                            <div class="${comic['type']}" style="display: none"><p class="TPB-run">TPB</p></div>
                            <a href="${comic['enlarge']}" data-lightbox="${comic['data-item-id']}" data-title="${comic['data-item-name']}"><img src="${comic['data-item-image']}" alt="${comic['data-item-description']}" class="img-fluid"></a>
                            <div class="comic__desc-wrap">
                            <a href="${comic['enlarge']}" data-lightbox="${comic['id']}" data-title="${comic['data-item-name']}"><div class="comic__desc" style="color:white">${comic['data-item-description']}, issue #${comic['issue']} (${comic['year']})</div></a>
                            </div>
                            </div>
                            <div style="text-align:center">
                            <button 
                                   class="snipcart-add-item comic__button" style="text-align:center; width: 100%; border: none; background-color: orange; font-weight: bold;" 
                                   data-item-id="${comic['id']}" 
                                   data-item-price="${comic['price']}" 
                                   data-item-url="/comics.json" 
                                   data-item-description="${comic['data-item-description']}" 
                                   data-item-image="${comic['data-item-image']}"
                                   data-item-weight="${comic.dimensions['weight']}"
                                   data-item-name="${comic['data-item-name']}"> 
                                   <div class="comic__desc-desk"> Add to cart <span style="text-decoration: line-through">£${comic['sale-price']}</span> <span style="color: red">£${comic['price']}</span></div><div class="comic__desc-mob" style="padding: .5rem"> <span style="color: red; text-decoration: line-through">£${comic['sale-price']}</span><br>£${comic['price']} <br>Add to cart</div>
                            </button>
                            </div>
                            </div>
                            `)    
                }
                counter++;
            }) 
            
        }
    });
}
getbooks()
update()
randomizer()
});
