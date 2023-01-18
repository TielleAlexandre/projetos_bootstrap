var bicicletarios = {
    "type": "FeatureCollection",
    "features": [
        { "geometry": {
                "type": "Point",
                "coordinates": [-22.898384886589664, -43.1810456551953]
            },
            "type": "Feature",
            "properties": {
                "popupContent": "Bicicletário 1",
                "address": "R. Acre, 29 -  - Centro, RJ",
            },
            "id": 1
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [-22.902622690006844, -43.176486935861085]
            },
            "type": "Feature",
            "properties": {
                "popupContent": "Bicicletário 2",
                "address": "R. do Ouvidor, 60 - Centro, RJ"
            },
            "id": 2
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [-22.90341401887252,-43.1780142015784]
            },
            "type": "Feature",
            "properties": {
                "popupContent": "Bicicletário 3",
                "address": "R. do Ouvidor, 116 - Centro, RJ"
            },
            "id": 3
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [-22.904829564477353, -43.17739608629404]
            },
            "type": "Feature",
            "properties": {
                "popupContent": "Bicicletário 4",
                "address": "R. Sete de Setembro, 81-67 - Centro"
            },
            "id": 4
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [-22.905511610488904, -43.17612873642972]
            },
            "type": "Feature",
            "properties": {
                "popupContent": "Bicicletário 5",
                "address": "R. São José, 70 - Centro, RJ"
            },
            "id": 5
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [-22.90436747886456,-43.174951059549485]
            },
            "type": "Feature",
            "properties": {
                "popupContent": "Bicicletário 6",
                "address": "R. da Assembléia, 10-20 - Centro - RJ"
            },
            "id": 6
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [-22.904619934180747,-43.1739348954778]
            },
            "type": "Feature",
            "properties": {
                "popupContent": "Bicicletário 7",
                "address": "Edifício Estado de Sá - Centro, RJ"
            },
            "id": 7
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [-22.906491760721373, -43.193485918491305]
            },
            "type": "Feature",
            "properties": {
                "popupContent": "Bicicletário 8",
                "address": "Av. Pres. Vargas, 1997 - Centro, RJ"
            },
            "id": 8
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [-22.905889249193205, -43.17414800499778]
            },
            "type": "Feature",
            "properties": {
                "popupContent": "Bicicletário 9",
                "address": "Av. Nilo Peçanha, 12 - Centro, RJ"
            },
            "id": 9
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [-22.903632045322038, -43.176625383894546]
            },
            "type": "Feature",
            "properties": {
                "popupContent": "Bicicletário 10",
                "address": "R. da Quitanda, 52 - Centro - RJ"
            },
            "id": 10
        }

    ]
};


let Position = L.Icon.extend({
    iconSize: [18, 28]
});
let marcadorReferencia = new Position({iconUrl: 'img/pontoReferencia.png',iconSize: [80,80]});
let marcadorBike = new Position({iconUrl: 'img/bike-64.png'});


// lat,lon
function buscarBicletariosMaisProximos(coordenadas,qtd) {
    let geoJson = L.geoJson(bicicletarios);
    return  leafletKnn(geoJson).nearest(L.latLng(coordenadas[1], coordenadas[0]), qtd);
}

function exibirBicicletariosMaisProximos(coordenadas,bicicletariosMaisProx){
    let elementoPai = document.getElementById("info_mapa");

    let div_info = document.createElement("div");
    div_info.id="info";
    div_info.className="col-4";

    // titulo
    let titulo = document.createElement('h3');
    titulo.appendChild(document.createTextNode("Bicicletários Mais Próximos"));
    div_info.appendChild(titulo);

    let lista = document.createElement("ul");
    for (let i = 0; i < bicicletariosMaisProx.length; i++) {
        let item = document.createElement("li");
        item.appendChild(document.createTextNode(bicicletariosMaisProx[i].layer.feature.properties.address+" | Distância: "+calcularDistanciaEntreCoordenadas_3(coordenadas[1], coordenadas[0],bicicletariosMaisProx[i].lat,bicicletariosMaisProx[i].lon) +" km"));
        L.marker([bicicletariosMaisProx[i].lon,bicicletariosMaisProx[i].lat], {icon: marcadorBike}).addTo(camadaMarcadores);
        lista.appendChild(item);
    }
    div_info.appendChild(lista);
    elementoPai.insertBefore(div_info, document.getElementById("map"));
}

function campoNaoEhNulo(campo){
    if(campo.length>0){return true;}else{return false;}
}

function exibirMsg(mensagem){
    let secao = document.querySelector("#msg");
    let div_msg = document.createElement('div');
    div_msg.id="div_msg"
    let paragrafo = document.createElement('p');
    paragrafo = document.createTextNode(mensagem);
    div_msg.appendChild(paragrafo);
    secao.appendChild(div_msg);
}

function removerElemento(id){
    let div_macro = document.getElementById(id);
    if(div_macro!=null){
       div_macro.parentNode.removeChild(div_macro);
    }
}

function calcularDistanciaEntreCoordenadas_3(lat1, lon1, lat2, lon2,unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist.toFixed(3);
    }
}

window.onload=function() {
    document.querySelector("#btnBusca").addEventListener("click", function () {
        let endereco = document.querySelector("#endereco").value;
        let qtd = document.querySelector("#qtdBicicletario").value;
        removerElemento("div_msg");
        if (campoNaoEhNulo(endereco)) {
            camadaMarcadores.eachLayer(function (layer) {
                camadaMarcadores.clearLayers();
                removerElemento("info");
            });
            geocoder.geocode(endereco, async function (results) {
                if (results.length > 0) {
                    document.getElementById("btnBusca").innerHTML = "<span class=" + '"spinner-border spinner-border-sm"' + "role=" + '"status"' + "aria-hidden=" + '"true"' + "></span>\nCarregando...";
                    let coordenadas = [results[0].properties.lat, results[0].properties.lon];
                    L.marker(coordenadas, {icon: marcadorReferencia}).addTo(camadaMarcadores);
                    map.setView(coordenadas, 15);
                    setTimeout(exibirBicicletariosMaisProximos(coordenadas, await buscarBicletariosMaisProximos(coordenadas, qtd)), 5000);
                    document.getElementById("btnBusca").innerText = "Buscar";
                } else {
                    exibirMsg("Não foi possível localizar as coordenadas do endereço.");
                }
            });
        } else {
            exibirMsg("Informe um endereço.");
        }
    });
}

