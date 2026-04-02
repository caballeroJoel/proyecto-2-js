import { destinacionsDestacades, ofertes, hotelsPopulars, searchResultsData, productDetailData } from "./data.js";

const cls = {

    vacationOffers: document.querySelector("#vacation-offers"),
    inspirationItems: document.querySelector("#inspiration-items"),
    popularHotels: document.querySelector("#popularHotels"),

    querySearch: document.querySelector("#querySearch"),
    searchResults: document.querySelector("#searchResults"),
    filtertBudget: document.querySelector("#filtertBudget"),
    filtertBudgetCant: document.querySelector("#filtertBudgetCant"),
    filterActivitis: document.querySelector("#filterActivitis"),
    filterActivitisCant: document.querySelector("#filterActivitisCant"),
    filterPopular: document.querySelector("#filterPopular"),
    filterPopularCant: document.querySelector("#filterPopularCant"),

    listResult: document.querySelector("#listResult"),


    imgProducts: document.querySelector("#imgProducts"),
    nameProd: document.querySelector("#nameProd"),
    overviewProduct: document.querySelector("#overviewProduct"),
    areaProduct: document.querySelector("#areaProduct"),
    roomsAva: document.querySelector("#roomsAva"),
    
}

function render() {

    const ruta = window.location.pathname;
    // console.log(ruta);

    if(ruta == "/home.html") {
        vacacionesDestacadas();
        ofertas();
        popularHotel();
    }
    if(ruta == "/listado.html") {
        searchFilters();
        searchResult();
    }
    if(ruta == "/product.html") {
        productDetail();
    }

}

/****************** Home ******************/
function vacacionesDestacadas() {
    let html = '';

    destinacionsDestacades.forEach(dest => {
        html+= `
            <div>
                <img src="../img/cont/${dest.imatgeUrl}.jpg" alt="${dest.id}">
                <p>${dest.nom}</p>
                <span>${dest.propietatsCount} properties</span>
            </div>
        `;
    });

    cls.vacationOffers.innerHTML = html;
}
function ofertas() {
    let html = '';

    ofertes.forEach(of => {
        html+=`
            <div class="inspiration-item">
                <div>
                    <img src="./img/inspi/${of.imatgeUrl}.jpg">
                </div>
                <div class="cont">
                    <p>${of.titol}</p>
                    <span>${of.descripcio}</span>
                </div>
            </div>
        `;
    });

    cls.inspirationItems.innerHTML = html;
}
function popularHotel() {
    let html='';

    hotelsPopulars.forEach(pop => {
        html += `
            <div class="hotel-item" id="${pop.id}">
                <img src="../img/hoteles/${pop.imatgeUrl}.jpg" alt="">
                <p>${pop.nom}</p>
                <span>${pop.propietatsCount} properties</span>
            </div>
        `;
    });

    popularHotels.innerHTML = html;
}

/****************** Search ******************/
function searchFilters() {
    let html = '';
    let html1 = '';
    
    cls.querySearch.querySelector("#destination").value = searchResultsData.query.where;
    cls.querySearch.querySelector("#checkin").value = searchResultsData.query.checkin;
    cls.querySearch.querySelector("#checkout").value = searchResultsData.query.checkout;
    cls.querySearch.querySelector("#guests").value = searchResultsData.query.guests;

    cls.searchResults.innerHTML = `${searchResultsData.query.where} : ${searchResultsData.totalResults} search results found`;


    searchResultsData.filters.budgetRanges.forEach(filt => {
        html+= `
            <input type="checkbox" name="price" id="${filt.min}-${filt.max}">
            <span>$ ${filt.min} - $ ${filt.max}</span>
        `;
        html1 += `  
            <span>${filt.count}</span>
        `;
    });
    cls.filtertBudget.innerHTML = html;
    cls.filtertBudgetCant.innerHTML = html1;
    html="";
    html1="";
    
    searchResultsData.filters.activities.forEach(filt => {
        html += `
        <input type="checkbox" name="activities" id="${filt.id}">
        <span>${filt.label}</span>
        `;
        html1 += `
        <span>${filt.count}</span>
        `;
    });
    cls.filterActivitis.innerHTML = html;
    cls.filterActivitisCant.innerHTML = html1;
    html="";
    html1="";
    
    searchResultsData.filters.popularFilters.forEach(filt => {
        html += `
            <input type="checkbox" name="popular" id="${filt.id}">
            <span>${filt.label}</span>
        `;
        html1 += `
            <span>${filt.count}</span>
        `;
    });

    cls.filterPopular.innerHTML = html;
    cls.filterPopularCant.innerHTML = html1;
    html="";
    html1="";

}
function searchResult() {

    let html="";
    let html1="";

    searchResultsData.results.forEach(sch => {

        html1 = sch.badge ? `<p class="${sch.badgeCol}">${sch.badge}</p>` : "";
       
        html += `
            <div class="container">
                <div>
                    <img src="./img/searches/${sch.hotelId}.png" alt="">
                </div>
                <div class="desc">
                    <div class="carac">
                        <h2>${sch.name}</h2>
                        <div class="stars-rating">
                            <div>
                                <img src="./img/star.png" alt="">
                                <img src="./img/star.png" alt="">
                                <img src="./img/star.png" alt="">
                                <img src="./img/star.png" alt="">
                                <img src="./img/star.png" alt="">
                            </div>
                            <p>${sch.rating} (${sch.reviewsCount} Reviews)</p>
                        </div>
                        <p>${sch.description}</p>
                        <span>Reats include a glass of French champagne, parking and a late checkout. Gym included. Flexible cancellation applies</span>
                        <button>See availability</button>
                    </div>
                    <div class="price">
                        <div class="prom">
                            ${html1}
                        </div>
                        <div>
                            <span class="off">5% off</span>
                            <p class="rooms">1 room 2 days</p>
                            <div class="doll">
                                <p class="marc">$150</p>
                                <p>${sch.pricePerNight}</p>
                            </div>
                            <p>Includes taxes and fees</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    console.log(html);

    listResult.innerHTML = html;

}

/****************** Search ******************/
function productDetail() {
    let htmlImg = '', htmlName='', hmtlOverview='', htmlFacilities = '';
    let htmlArea = '', htmlRooms = '';

    htmlImg += `
        <div>
            <div>
                <img src="./img/products/${productDetailData.hotel.id}_1.png" alt="">
                </div>
                
                <div>
                <div>
                    <img src="./img/products/${productDetailData.hotel.id}_2.png" alt="">
                </div>
                
                <div>
                    <img src="./img/products/${productDetailData.hotel.id}_3.png" alt="">
                </div>
            </div>
        </div>
    `;
    cls.imgProducts.innerHTML = htmlImg;


    htmlName = `
        <h1>${productDetailData.hotel.name}</h1>
        <div class="stars-rating">
            <div>
                <img src="./img/star.png" alt="">
                <img src="./img/star.png" alt="">
                <img src="./img/star.png" alt="">
                <img src="./img/star.png" alt="">
                <img src="./img/star.png" alt="">
            </div>
            <p>${productDetailData.hotel.rating} (${productDetailData.hotel.reviewsCount} Reviews)</p>
        </div>
        <div class="loc">
            <img src="./img/ubicaciones.png" alt="">
            <p>${productDetailData.hotel.address}</p>
        </div>
    `;
    cls.nameProd.innerHTML = htmlName;

    productDetailData.topFacilities.forEach(fac => {
        htmlFacilities += `
            <div>
                <img src="./img/icons_prod/${fac.id}.png" alt="">
                <span>${fac.label}</span>
            </div>
        `;
    });

    hmtlOverview = `
        <p>Overview</p>
        <div class="overview-span">
            <span>${productDetailData.hotel.overviewText}</span>
        </div>
        <hr>
        <p>Top facilities</p>
        <div class="facitities">
            ${htmlFacilities}
        </div>
    `;
    cls.overviewProduct.innerHTML = hmtlOverview;

    let html="";
    productDetailData.exploreArea.forEach(area => {
        html += `
            <div>
                <div>
                    <img src="./img/icons_prod/plane.png" alt="">
                    <span>${area.name}</span>
                </div>
                <div>
                    <span>${area.distance}</span>
                </div>
            </div>
        `;
    });

    htmlArea = `
        <img src="./img/products/map-${productDetailData.hotel.id}.png" alt="">
        <div>
            <p>Explore the area</p>

            <div class="explore">
                ${html}
            </div>
        </div>
    `;
    cls.areaProduct.innerHTML = htmlArea;

    html='';

    productDetailData.rooms.forEach(room => {
        html += `
            <div class="dorm">
                <img src="./img/products/${room.id}.png" alt="">
                <div>
                    <h3>${room.name}</h3>
                    <div>
                        <div>
                            <img src="./img/icons_prod/security_gr.png" alt="">
                            <span>${room.price} ${room.currency}</span>
                        </div>
                        <div>
                            <img src="./img/icons_prod/pool_gr.png" alt="">
                            <span>Sleeps ${room.sleeps}</span>
                        </div>
                        <div>
                            <img src="./img/icons_prod/top_gr.png" alt="">
                            <span>${room.beds}</span>
                        </div>
                    </div>
                    <button>Reserve suite</button>
                </div>
            </div>
        `;
    });

    htmlRooms = `
        <h2>Available rooms</h2>
            <div class="reserva">
                <div>
                    <input type="text" placeholder="${productDetailData.availability.checkin}">
                    <img src="./img/calendario.png" alt="">
                </div>
                <div>
                    <input type="text" placeholder="${productDetailData.availability.checkout}">
                    <img src="./img/calendario.png" alt="">
                </div>
                <div>
                    <input type="text" placeholder="${productDetailData.availability.guests}">
                    <img src="./img/avatar.png" alt="">
                </div>
                <div>
                    <button>Check Availability</button>
                </div>
            </div>

            <div class="results">
                <div class="discount">
                    <div>
                        <div>
                            <img src="./img/avion_wh.png" alt="">
                            <span>my Dream Place</span>
                        </div>
                        <p>${productDetailData.promoCard.title}</p>
                    </div>
                    <div>
                        <img class="person" src="./img/products/person.png" alt="">
                    </div>
                </div>
                ${html}
            </div>
    `;

    cls.roomsAva.innerHTML = htmlRooms;

}





render();