let socket = io();
console.log("%cMade by Jan Poláček", "font-size:30px;");
console.log(socket)

let languages = document.getElementById('languages');
languages.onchange = changeFlag;
changeFlag();

function changeFlag() {
    let lang1 = document.getElementById('lang1').value;
    let lang2 = document.getElementById('lang2').value;
    document.getElementById('flag1').src = "assets/" + lang1 + ".png";
    document.getElementById('flag2').src = "assets/" + lang2 + ".png";
}

document.getElementById('button-api').onclick = () => {
    window.open("https://www.npmjs.com/package/translate", "_blank")
};

document.getElementById('button-search').onclick = () => {
    window.open('https://translate.google.cz/?hl=en&sl=' +
        document.getElementById('lang1').value +
        '&tl=' +
        document.getElementById('lang2').value +
        '&text=' +
        document.getElementById('input').value
    , '_blank');
}

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    let lang1 = document.getElementById('lang1').value;
    let lang2 = document.getElementById('lang2').value;
    let input = document.getElementById('input').value;
    socket.emit('translate', [lang1, lang2, input]);
});

socket.on('translate', (args) => {
    document.getElementById('output').value = args;
});