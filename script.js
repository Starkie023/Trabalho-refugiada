var map

function localizar(){
  navigator.geolocation.getCurrentPosition(showPosition)
}

async function showPosition(pos){
  var lt = pos.coords.latitude
  var lg = pos.coords.longitude

  var url = "https://api.hgbrasil.com/weather?format=json-cors&key=	038fcc16&lat=" + lt+"&lon=" + lg

  var response = await fetch(url)
  var data = await response.json()

  var cidade = data.results.city
  var temp = data.results.temp
  var desc = data.results.description
  var img = data.results.img_id

  document.getElementById("geo").innerHTML = 
  " Minha casa está em Latitude: " + lt + ", Longitude: " + lg

  map = L.map('map').setView([lt, lg], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic3RhcmtpZTAyMyIsImEiOiJjbDQ0b2Npb3UwcTBwM2JsbGNyY3M3aXpiIn0.dDXo26y4qXNtuEV-D289Bw'
  }).addTo(map);

  var marker = L.marker([lt, lg]).addTo(map);
  var texto = "Clima em:" + cidade + " é " + temp + ", " + desc
  
  marker.bindPopup(texto).openPopup()

}

init()

function init(){
  document.getElementById("quartos").addEventListener("keyup", salvar)
  document.getElementById("endereco").addEventListener("keyup", salvar)
  document.getElementById("filhos").addEventListener("keyup", salvar)
  document.getElementById("tel").addEventListener("keyup", salvar)
  document.getElementById("email").addEventListener("keyup", salvar)
  document.getElementById("nome").addEventListener("keyup", salvar)
}

function salvar(){
  var nome = document.getElementById("nome").value
  var email = document.getElementById("email").value
  var tel = document.getElementById("tel").value
  var ddt = document.getElementById("ddt").value
  var filhos = document.getElementById("filhos").value
  var endereco = document.getElementById("endereco").value
  var quartos = document.getElementById("quartos").value

  localStorage.setItem("user", nome)
  localStorage.setItem("email", email)
  localStorage.setItem("telefone", tel)
  localStorage.setItem("ddt", ddt)
  localStorage.setItem("ndf", filhos)
  localStorage.setItem("endereco", endereco)
  localStorage.setItem("ndq", quartos)
}
function recuperar(){
  if("user" in localStorage){
    document.getElementById("nome").value = localStorage.getItem("user")
  }
  if("email" in localStorage){
    document.getElementById("email").value = localStorage.getItem("email")
  }
  if("telefone" in localStorage){
    document.getElementById("tel").value = localStorage.getItem("telefone")
  }
  if("ddt" in localStorage){
    document.getElementById("ddt").value = localStorage.getItem("ddt")
  }
  if("ndf" in localStorage){
    document.getElementById("filhos").value = localStorage.getItem("ndf")
  }
  if("endereco" in localStorage){
    document.getElementById("endereco").value = localStorage.getItem("endereco")
  }
  if("ndq" in localStorage){
    document.getElementById("quartos").value = localStorage.getItem("ndq")
  }
}
function limpar(){
  localStorage.clear()
}