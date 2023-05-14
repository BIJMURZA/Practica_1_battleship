let ships = 4; // общее количество кораблей
let fships = 4; // количество клеток для Линкора (4-х палубный корабль)
let thships = 6; // количество клеток для Крейсера (3-х палубный корабль)
let twships = 6; // количество клеток для Эсминцев (2-х палубный корабль)
let shlupki = 4; // количество клеток для Шлюпки (1 палубный корабль)
let alships = 20; //общее количество клеток союзников
let enships = 20; //общее количество клеток врага
let begin = null;
let left = null;
let right = null;
let up = null;
let down = null;
let direction = null; // направление клеток
let array = [];
const lot = Math.floor(Math.random() * 2) + 1; // 1 - Первый ход за союзниками || 2 - Первый ход за Капиталистами
let move = 1; //1 - ваш ход, 0 - ход противника

let allaybattlefield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]; // поле союзника

let enemybattlefield = [
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0]
] // поле врага

// 0 - пустое поле 1 - расположение корабля 2 - подбитый корабль

function initial (id) {
    begin = id;
    left = begin;
    right = begin;
    up = begin;
    down = begin;
}

function reset () {
    begin = null;
    left = null;
    right = null;
    up = null;
    down = null;
    direction = null;
}

function dir (id) {
    if (direction === null) {
        if (id === left - 1 || id === right + 1) {
            direction = "hor";
        }
        if (id === up - 10 || id === down + 10) {
            direction = "ver";
        }
    }

    if (direction === "hor") {
        if (id === left - 1) {
            left = id;
            return true;
        } else if (id === right + 1) {
            right = id;
            return true;
        }
    } else if (direction === "ver") {
        if (id === up - 10) {
            up = id;
            return true;
        }
        else if (id === down + 10) {
            down = id;
            return true;
        }
    }
    else {return false; }
}

function linkor(event) {
    let x = Math.floor((Number(event.target.id) - 1) / 10);
    let y = (Number(event.target.id) - 1) % 10;
    if (fships > 0) {
        if (begin === null) {
            initial(Number(event.target.id));
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = 1;
            fships --;
            return;
        }
        if (dir (Number(event.target.id)) === true) {
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = 1;
            fships --;
        } else {return; }
        if (fships === 0) {
            ships --;
            reset();
        }
    }
    start();
}

function craser(event) {
    let x = Math.floor((Number(event.target.id) - 1) / 10);
    let y = (Number (event.target.id) - 1) % 10;
    if (thships > 0) {
        if (begin === null) {
            initial(Number(event.target.id));
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = 1;
            fships --;
        }
    }
}

function start() {
    switch(ships) {
        case 4:
            document.getElementById("out").innerText = "Расположите линкор (4 клетки)";
            document.getElementById("albattlefield").addEventListener("click", linkor);
            break;
        case 3:
            document.getElementById("out").innerText = "Расположите 2 крейсера (каждая по 3 клетки)";
            document.getElementById("albattlefield").addEventListener("click", craser);
            break;
        case 2:
            break;
        case 1:
            break;
    }
}