shopCount = 0;
var max = 27;
var min = 0;
var bookTotal = 0;
var minvalue = 0;
var maxvalue = 999999999;

function randomizer() {
    var banner = $(".header__banner-img");
    
    var backgrounds = ["/img/Fantasy Road banner 5 - new and preowned coic book sales, pressing and cleaning services, middleman services.jpg","/img/Fantasy Road banner 4 - new and preowned coic book sales, pressing and cleaning services, middleman services.jpg","/img/Fantasy Road banner 3 - new and preowned coic book sales, pressing and cleaning services, middleman services.jpg","/img/Fantasy Road banner 2 - new and preowned coic book sales, pressing and cleaning services, middleman services.jpg", "/img/Fantasy Road banner 1 - new and preowned coic book sales, pressing and cleaning services, middleman services.jpg"]
    var random = getRandom(4)
    var background = backgrounds[random]
    function getRandom(max) {
       return Math.floor(Math.random() * max);
    }
    banner.attr('src', background);
    
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
var frontSale = $("#comic__list-sale");
var searchbar = $(".comic__search");
var searchBarVal = ""

function updateResults() {
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
            var searchField = comic['data-item-name'].toLowerCase()
            var searchfieldDesc = comic['data-item-description'].toLowerCase()
            

    
    
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


    if (publisher.toLowerCase().indexOf(searchBarVal.toLowerCase()) >= 0 || searchField.toLowerCase().indexOf(searchBarVal.toLowerCase()) >= 0 || searchfieldDesc.toLowerCase().indexOf(searchBarVal.toLowerCase()) >= 0 ) {

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

    } else {
        console.log("none");
        }



    
    
})
    if (list.children().length <= 0) {
        none()
    }
        }
    })

    
}

$("admin__submit").click(function(){
    var id = $('.admin__id');
    var price = $('.admin__price');
    var url = $('.admin__url');
    var data1 = $('.admin__data-item-description');
    var data2 = $('.admin__data-item-name');
    var year = $('.admin__year');
    var issue = $('.admin__issue');
    var series = $('.admin__series');
    var type = $('.admin__type');
    var label = $('.admin__label');
    var saleprice = $('.admin__sale-price');
    var publisher = $('.admin__publisher');
    var extra = $('.admin__extra');
    var run = $('.admin__run');
    var weight = $('.admin__weight');
    var stock = $('.admin__stock');
    var allowOutOfStockPurchases = $('.admin__allowOutOfStockPurchases');


    $.post("/comics.json",
    {
        "id" : id.val(),
        "price" : price.val(),
        "url" : "/",
        "data-item-description" : data1.val(),
        "data-item-image" : url.val(),
        "data-item-name" : data2.val(),
        "year" : year.val(),
        "issue" : issue.val(),
        "series" : series.val(),
        "type" : type.val(),
        "label" : label.val(),
        "sale-price" : saleprice.val(),
        "publisher" : publisher.val(),
        "extra" : extra.val(),
        "run" : run.val(),
        "dimensions" : {
            "weight" : weight.val()
        },
        "stock" : stock.val(),
        "allowOutOfStockPurchases" : allowOutOfStockPurchases.val()
    },
    function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  });

$('.comic__search').on("keypress", function(e) { 
    if(e.which == 13) {
        updateResults()
    } 
});


$("body").on("keyup", ".comic__search", function(e) {
    searchBarVal = $(this).val();
    
    console.log(searchBarVal);
  });

$("body").on("click", "#comicSearch", function() {    
    updateResults();
    console.log("click");
});
  

$("body").on("click", ".comic__nav-buttons-reset", function() {
    age = "";
    search = "";
    pubfilt = "";
    $(".filter__min").empty();
    $(".filter__max").empty();
    $(".filter__age").empty();
    $(".filter__publisher").empty();
    $(".filter__letter").empty();
    minvalue = 0;
    maxvalue = 999999999;
    $(".comic__nav-buttons-age").removeClass("current-age");
    $(".comic__nav-buttons").removeClass("current");
    $(".comic__nav-buttons-pub").removeClass("current-pub");
    max = 27;
    update() 
});

$("body").on("click", ".comic__nav-buttons", function() {
    $(".comic__nav-buttons").removeClass("current");
    search = this.id;
    max = bookTotal;
    loadMore()
    update()
    $(this).addClass("current");
    $(".filter__letter").empty()
    $(".filter__letter").append(`
        <button class="btn btn-warning show-letter mob-show-filter-btns">Letter: <span style="font-weight: bold">${search.toUpperCase()}</span> <span class="filter-exit">x</span></button>
    `)

})

$("body").on("click", ".comic__nav-buttons-pub", function() {
    $(".comic__nav-buttons-pub").removeClass("current-pub");
    $(".comic__nav-buttons").removeClass("current");
    pubfilt = this.id.toLowerCase();
    update();
    $(this).addClass("current-pub");
    max = bookTotal;
    loadMore()
    $(".filter__publisher").empty()
    $(".filter__publisher").append(`
        <button class="btn btn-warning show-pub mob-show-filter-btns">Publisher: <span style="font-weight: bold">${pubfilt}</span> <span class="filter-exit">x</span></button>
    `)
})

$("body").on("click", ".comic__nav-buttons-max", function() {
    $(".comic__nav-buttons-max").removeClass("current-max");
    $(".comic__nav-buttons").removeClass("current");
    maxvalueNonInt = this.id.toLowerCase();
    maxvalue = parseFloat(this.id.substring(1));
    update();
    $(this).addClass("current-max");
    max = bookTotal;
    loadMore()
    $(".filter__max").empty()
    $(".filter__max").append(`
        <button class="btn btn-warning show-max mob-show-filter-btns">Max: <span style="font-weight: bold">${maxvalueNonInt}</span> <span class="filter-exit">x</span></button>
    `)
})

$("body").on("click", ".comic__nav-buttons-min", function() {
    $(".comic__nav-buttons-min").removeClass("current-min");
    $(".comic__nav-buttons").removeClass("current");
    minvalueNonInt = this.id.toLowerCase();
    minvalue = parseFloat(this.id.substring(1));
    update();
    $(this).addClass("current-min");
    max = bookTotal;
    loadMore()
    $(".filter__min").empty()
    $(".filter__min").append(`
        <button class="btn btn-warning show-min mob-show-filter-btns">Min: <span style="font-weight: bold">${minvalueNonInt}</span> <span class="filter-exit">x</span></button>
    `)
})

$("body").on("click", ".comic__nav-buttons-age", function() {
    $(".comic__nav-buttons-age").removeClass("current-age");
    $(".comic__nav-buttons").removeClass("current");
    age = this.id.toLowerCase();
    max = bookTotal;
    loadMore()
    update();
    $(this).addClass("current-age");
    $(".filter__age").empty()
    $(".filter__age").append(`
        <button class="btn btn-warning show-age mob-show-filter-btns">Age:<span style="font-weight: bold"> ${age} </span><span class="filter-exit">x</span></button>
    `)
})

$("body").on("click", ".show-age", function() {
    $(".comic__nav-buttons-age").removeClass("current-age");
    $(".comic__nav-buttons").removeClass("current");
    age = ""

    loadMore()
    update();
    $(".filter__age").empty()
    $(".filter__age").append(``)
})
$("body").on("click", ".show-pub", function() {
    $(".comic__nav-buttons-pub").removeClass("current-pub");
    $(".comic__nav-buttons").removeClass("current");
    pubfilt = ""

    loadMore()
    update();
    $(".filter__publisher").empty()
    $(".filter__publisher").append(``)
})
$("body").on("click", ".show-min", function() {
    $(".comic__nav-buttons-min").removeClass("current-min");
    $(".comic__nav-buttons").removeClass("current");
    minvalue = "0"

    loadMore()
    update();
    $(".filter__min").empty()
    $(".filter__min").append(``)
})
$("body").on("click", ".show-max", function() {
    $(".comic__nav-buttons-max").removeClass("current-max");
    $(".comic__nav-buttons").removeClass("current");
    maxvalue = "999999999"

    loadMore()
    update();
    $(".filter__max").empty()
    $(".filter__max").append(``)
})
$("body").on("click", ".show-letter", function() {
    $(".comic__nav-buttons-letter").removeClass("current-letter");
    $(".comic__nav-buttons").removeClass("current");
    search = ""

    loadMore()
    update();
    $(".filter__letter").empty()
    $(".filter__letter").append(``)
})

$("body").on("click", ".comic__nav-buttons-show-box", function() {
    var text = $("comic__nav-buttons-show").text;
    $(".comic__nav-box").toggleClass("mob-hide");
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
var pub = ["Marvel", "DC", "Vertigo", "Wildstorm", "Image", "Avatar", "Dynamite", "Icon", "MAX", "Dark Horse", "Other"]
var ages = ["Modern", "Bronze", "Silver", "Gold"]
var maxvalues = ["£1", "£5", "£10", "£25", "£50", "£100", "£1000"]
var minvalues = ["£1", "£5", "£10", "£25", "£50", "£100", "£1000"]

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
$.each(maxvalues, function(index, value) {
    var list = $(".comic__nav-buttons-max-box");
        list.append(`
            <button id="${value}" class="btn btn-warning comic__nav-buttons-max">${value.toUpperCase()}</button>
            `)   
});
$.each(minvalues, function(index, value) {
    var list = $(".comic__nav-buttons-min-box");
        list.append(`
            <button id="${value}" class="btn btn-warning comic__nav-buttons-min">${value.toUpperCase()}</button>
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
            var price = parseFloat(comic.price);
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
    if (price > minvalue && price < maxvalue) {
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
                if (pubfilt == "other") {
                    if (publisher != "marvel" && publisher != "dc" && publisher != "vertigo" && publisher != "wildstorm" && publisher != "image" && publisher != "avatar" && publisher != "dynamite" && publisher != "icon" && publisher != "max" && publisher != "dark horse") {
                        if (search == "") {
                            template(currentObject)
                        } else if (search.includes(publisher) && publisher == pubfilt
                        || search.includes(issue) && publisher == pubfilt
                        || name.startsWith(search) && publisher == pubfilt) {
                           template(currentObject)
                
                        } 
                    }
                } else if (publisher == pubfilt) {
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
    
}
    
    
})
loadMore()
    if (list.children().length <= 0) {
        none()
    }
        }
    })

    
}

$("#submitEmail").on("click", function(e) {
    e.preventDefault();
    var email = "customerservice@fantasyroad.co.uk";
    var subject = "Fantasy Road Contact";
    var message = $("#message").val();
    var name = $("#name").val();
    var number = $("#number").val();
    window.location = 'mailto:' + email + '?subject=' + subject + '&body=' + message + " " + name + " " + number;
})

$(function () {
    $('#emailLink').on('click', function (event) {
        event.preventDefault();
      alert("Huh");
      var email = 'test@theearth.com';
      var subject = 'Circle Around';
      var emailBody = 'Some blah';
      window.location = 'mailto:' + email + '?subject=' + subject + '&body=' +   emailBody;
    });
  });

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
