import { destinacionsDestacades, ofertes, hotelsPopulars, searchResultsData } from "./data.js";

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
    
}

function render() {

    const ruta = window.location.pathname;

    if(ruta == "/home.html") {
        vacacionesDestacadas();
        ofertas();
        popularHotel();
    }
    if(ruta == "/listado.html") {
        searchFilters();
        searchResult();
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



render();