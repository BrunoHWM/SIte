function validaBusca() {
    if (document.querySelector('#q').value == '') {
    alert('Não podia ter deixado em branco a busca!');
    return false;
    }
}
    
document.querySelector('#form-busca').onsubmit = validaBusca;

var banners = ["img/css-32-removebg-preview.png", "img/186320-removebg-preview.png"];
var bannerAtual = 0;
function trocaBanner() {
bannerAtual = (bannerAtual + 1) % 2;
document.querySelector('.destaque img').src = banners[bannerAtual];
}
var timer = setInterval(trocaBanner, 1000);

var controle = document.querySelector('.pause');
controle.onclick = function() { if (controle.className == 'pause') { clearInterval(timer);
controle.className = 'play'; } else { timer = setInterval(trocaBanner, 4000);
controle.className = 'pause'; } return false; }; 
