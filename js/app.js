import { destinacionsDestacades, ofertes } from "./data.js";

const cls = {

    vacationOffers: document.querySelector("#vacation-offers"),
    inspirationItems: document.querySelector("#inspiration-items"),
    
}

function render() {
    vacacionesDestacadas();
    ofertas();
}

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

render();