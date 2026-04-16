let supabaseUrl = "https://zorudgbkbgddrhyvowyq.supabase.co";
let supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvcnVkZ2JrYmdkZHJoeXZvd3lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDEwNzYsImV4cCI6MjA5MTkxNzA3Nn0.hTj6ZFQmxptpcn8rJzFHSMd7DttrNwS0ZJYGsUpxN2Y"; 

let client = supabase.createClient(supabaseUrl, supabaseAnonKey);

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

    titleRoom: document.querySelector("#titleRoom"),
    resumenReser: document.querySelector("#resumenReser"),
    infoImportant: document.querySelector("#infoImportant"),
    
    myTrips: document.querySelector("#myTrips"),
    sugTripsHist: document.querySelector("#sugTripsHist"),
    
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
    if(ruta == "/product.html") {
        productDetail();
    }
    if(ruta == "/reservation.html") {
        room();
        reservation();
        importantInfo();
    }
    if(ruta == "/my_trips.html") {
        myTrips();
        sugTrips();
    }

}

/****************** Home ******************/
async function vacacionesDestacadas() {

    let resultat = await client.from("destinacions_destacades").select("*");
    let destinations = resultat.data || [];
    
    let html = "";

    destinations.forEach(dest => {
        html+= `
            <div>
                <img src="../img/cont/${dest.imatge_url}.jpg" alt="${dest.id}">
                <p>${dest.nom}</p>
                <span>${dest.propietatsCount} properties</span>
            </div>
        `;
    });

    cls.vacationOffers.innerHTML = html;
}
async function ofertas() {

    let resultat = await client.from("ofertes_destacades").select("*");
    let ofertes = resultat.data || [];

    let html = '';

    ofertes.forEach(of => {
        html+=`
            <div class="inspiration-item">
                <div>
                    <img src="./img/inspi/${of.imatge_url}.jpg">
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
async function popularHotel() {
    let html='';

    let resultat = await client.from("hotels_populars").select("*");
    let hotels = resultat.data || [];

    hotels.forEach(pop => {
        html += `
            <div class="hotel-item" id="${pop.id}">
                <img src="../img/hoteles/${pop.imatge_url}.jpg" alt="">
                <p>${pop.nom}</p>
                <span>${pop.propietatsCount} properties</span>
            </div>
        `;
    });

    popularHotels.innerHTML = html;
}

/****************** Search ******************/
async function searchFilters() {
    let html = '';
    let html1 = '';

    let { data, error } = await client
        .from("search_results_data")
        .select("*")
        .single();

    if (error) {
        console.error(error);
        return;
    }

    const query = data.query;
    const filters = data.filters;

    cls.querySearch.querySelector("#destination").value = query.where;
    cls.querySearch.querySelector("#checkin").value = query.checkin;
    cls.querySearch.querySelector("#checkout").value = query.checkout;
    cls.querySearch.querySelector("#guests").value = query.guests;

    cls.searchResults.innerHTML = `${query.where} : ${data.total_results} search results found`;

    filters.budgetRanges.forEach(filt => {
        html += `
            <input type="checkbox" name="price" id="${filt.min}-${filt.max}">
            <span>$ ${filt.min} - $ ${filt.max}</span>
        `;
        html1 += `<span>${filt.count}</span>`;
    });

    cls.filtertBudget.innerHTML = html;
    cls.filtertBudgetCant.innerHTML = html1;

    html = "";
    html1 = "";

    filters.activities.forEach(filt => {
        html += `
            <input type="checkbox" name="activities" id="${filt.id}">
            <span>${filt.label}</span>
        `;
        html1 += `<span>${filt.count}</span>`;
    });

    cls.filterActivitis.innerHTML = html;
    cls.filterActivitisCant.innerHTML = html1;

    html = "";
    html1 = "";

    filters.popularFilters.forEach(filt => {
        html += `
            <input type="checkbox" name="popular" id="${filt.id}">
            <span>${filt.label}</span>
        `;
        html1 += `<span>${filt.count}</span>`;
    });

    cls.filterPopular.innerHTML = html;
    cls.filterPopularCant.innerHTML = html1;
}
async function searchResult() {

    let html = "";
    let html1 = "";

    let { data, error } = await client
        .from("search_results_data")
        .select("results")
        .single();

    if (error) {
        console.error(error);
        return;
    }

    const results = typeof data.results === "string"
        ? JSON.parse(data.results)
        : data.results;

    results.forEach(sch => {

        html1 = sch.badge 
            ? `<p class="${sch.badgeCol}">${sch.badge}</p>` 
            : "";

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

    listResult.innerHTML = html;
}

/***************** Prodcut *****************/
async function productDetail() {
    let htmlImg = '', htmlName='', hmtlOverview='', htmlFacilities = '';
    let htmlArea = '', htmlRooms = '';

    let { data, error } = await client
        .from("product_detail_data")
        .select("*")
        .single();

    if (error) {
        console.error(error);
        return;
    }
    const productDetailData = data;

    console.log(productDetailData);

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

    productDetailData.top_facilities.forEach(fac => {
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
            <span>${productDetailData.hotel.overview_text}</span>
        </div>
        <hr>
        <p>Top facilities</p>
        <div class="facitities">
            ${htmlFacilities}
        </div>
    `;
    cls.overviewProduct.innerHTML = hmtlOverview;

    let html="";
    productDetailData.explore_area.forEach(area => {
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
                        <p>${productDetailData.promo_card.title}</p>
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

/****************** Reserv ******************/
async function room() {

    let { data, error } = await client
        .from("checkout_data")
        .select("*")
        .single();

    if (error) {
        console.error(error);
        return;
    }

    const checkoutData = data;

    let html = `
        <img src="./img/icons_prod/person_shield.png" alt="">
        <h2>${checkoutData.room.roomLabel}</h2>
        <span>${checkoutData.room.summary}</span>
    `;


    cls.titleRoom.innerHTML = html;
}
async function reservation() {
    let html = '', html2 = '';

    let { data, error } = await client
        .from("checkout_data")
        .select("*")
        .single();

    if (error) {
        console.error(error);
        return;
    }

    const checkoutData = data;

    checkoutData.price_details.items.forEach(item => {
        html2 += `
            <div>
                <span>$ ${item.description}</span>
                <span>$ ${item.amount}</span>
            </div>
        `;
    });

    html = `
        <div class="resumen">
            <div class="img">
                <img src="./img/products/${checkoutData.summary_card.hotelId}_2.png" alt="">
            </div>
            <div class="resm">
                <div>
                    <p>${checkoutData.summary_card.hotelName}</p>
                    <div class="stars-rating">
                        <div>
                            <img src="./img/star.png" alt="">
                            <img src="./img/star.png" alt="">
                            <img src="./img/star.png" alt="">
                            <img src="./img/star.png" alt="">
                            <img src="./img/star.png" alt="">
                        </div>
                        <p>${checkoutData.summary_card.rating} (${checkoutData.summary_card.reviewCount} Reviews)</p>
                    </div>
                </div>
                <div class="prop">
                    <span class="marc">${checkoutData.summary_card.policy}</span>
                    <span>Check in: ${checkoutData.summary_card.checkIn}</span>
                    <span>Check out: ${checkoutData.summary_card.checkOut}</span>
                    <span>${checkoutData.summary_card.stayNights} night stay</span>
                </div>
            </div>
        </div>

        <div class="price_det">
            <div class="tit">
                <p>Price Detail</p>
            </div>
            <div class="details">
                <div class="prices">
                    ${html2}
                </div>
                <hr>
                <div class="total">
                    <div class="precio_total">
                        <p>Total</p>
                        <p class="precio">${checkoutData.price_details.currency}${checkoutData.price_details.total}</p>
                    </div>
                    <span>Use a coupon, credit or promotional code</span>

                    <div class="coupon">
                        <span>Coupon code</span>
                        <div>
                            <input type="text" name="coupon" id="coupon">
                            <input type="submit" value="Apply Coupon">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    cls.resumenReser.innerHTML = html;

}
async function importantInfo() {

    let html2 = '';

    let { data, error } = await client
        .from("checkout_data")
        .select("*")
        .single();

    if (error) {
        console.error(error);
        return;
    }

    const checkoutData = data;

    checkoutData.policy_items.forEach(item => {
        html2+= `
            <li>${item}</li>
        `;
    });

    let html = `
        <div class="title">
            <img src="./img/icons_prod/lock.png" alt="">
            <h2>Important information</h2>
        </div>
        <div class="cont">
            <ol>
                ${html2}
            </ol>
            <br>
            <span>By clicking the button below, I acknowledge that I have reviewed the <a href="">Privacy Statement</a> and have reviewd and accept the <a href="">Rules and Restrictions</a> and <a href="">Terms of Use.</a></span>
            <button>Complete Booking</button>
            <div>
                <img src="./img/icons_prod/green_lock.png" alt="">
                <span>We use secure transmission and encrypted storage to protect your personal information</span>
            </div>
        </div>
    `;

    cls.infoImportant.innerHTML = html;
}

/****************** My Trips *****************/
function myTrips() {
    let html = '<h1>My trips</h1>';

    myTripsData.trips.forEach(trip => {
        html += `
            <div class="trips" id="${trip.bookingId}">
                <div class="img">
                    <img src="./img/products/${trip.hotelId}_2.png" alt="">
                </div>
                <div>
                    <div>
                        <div>
                            <h2>${trip.hotelName}</h2>
                            <div class="stars-rating">
                                <div>
                                    <img src="./img/star.png" alt="">
                                    <img src="./img/star.png" alt="">
                                    <img src="./img/star.png" alt="">
                                    <img src="./img/star.png" alt="">
                                    <img src="./img/star.png" alt="">
                                </div>
                                <p>${trip.rating} (${trip.reviewsCount} Reviews)</p>
                            </div>
                        </div>
                        <div class="prop">
                            <span>${trip.policy}</span>
                            <p>Check in: ${trip.checkIn}</p>
                            <p>Check out: ${trip.checkOut}</p>
                            <p>${trip.nights} night stay</p>
                        </div>

                    </div>
                    <div class="price">
                        <p>${trip.rooms} room 2 days</p>
                        <div class="doll">
                            <p class="red">${trip.currency}${trip.oldPrice}</p>
                            <p>${trip.currency}${trip.price}</p>
                        </div>
                        <p>Includes taxes and fees</p>
                        <button>View trip details</button>
                    </div>
                </div>
            </div>
        `;
    });

    cls.myTrips.innerHTML = html;
}

function sugTrips() {
    let html = "";

    myTripsData.suggestedDestinations.forEach(trip => {
        html += `
            <div class="hotel-item" id="${trip.id}">
                <img src="./img/cont/${trip.imatgeUrl}" alt="">
                <p>${trip.nom}</p>
                <span>${trip.propietatsCount} properties</span>
            </div>
        `;
    })

    cls.sugTripsHist.innerHTML = html;
}

render();