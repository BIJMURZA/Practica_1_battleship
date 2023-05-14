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

function fill (array) {
    for (let i = 0; i < array.length - 1; i += 2) {
        let x = array[i];
        let y = array[i+1];

        if (checkCell(x, y) !== undefined) {
            allaybattlefield[x][y] = 1;
        }
    }
    return array.length = 0;
}

function checkCell(x, y) {
    if (x < 0 || x >= allaybattlefield.length || y < 0 ||y >= allaybattlefield[x].length) {
        return undefined;
    }
    return allaybattlefield[x][y];
}

function check (x, y) {
    return (checkCell(x, y) !== 1) &&
        (checkCell(x, y - 1) !== 1) && (checkCell(x, y + 1) !== 1) &&
        (checkCell(x - 1, y) !== 1) && (checkCell(x + 1, y) !== 1) &&
        (checkCell(x - 1, y - 1) !== 1) && (checkCell(x - 1, y + 1) !== 1) &&
        (checkCell(x + 1, y - 1) !== 1) && (checkCell(x + 1, y + 1) !== 1);
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
            thships --;
            return;
        }
        if (dir(Number(event.target.id)) === true) {
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = 1;
            thships --;
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
        if (check(x, y) === true) {
            if (begin === null) {
                initial(Number(event.target.id));
                document.getElementById(event.target.id).style.background = 'red';
                allaybattlefield[x][y] = 1;
                thships --;
            }
            if (dir(Number(event.target.id)) === true) {
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y);
                thships --;
            }
            if (thships === 3) {
                fill(array);
                reset();
            }
            if (thships === 0) {
                fill(array);
                reset();
                ships --;
            }
        }
    }
    start();
}

function esminec (event) {
    let x = Math.floor(( Number(event.target.id) - 1) / 10);
    let y = (Number(event.target.id) - 1) % 10;
    if (twships > 0) {
        if (check(x, y) === true) {
            if (begin === null) {
                initial(event.target.id);
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y)
                twships--;
                return;
            }
            if (dir(Number(event.target.id)) === true) {
                document.getElementById(event.target.id).style.background = 'red';
                array.push(x, y)
                twships--;
            }
            if (twships === 4) {
                fill(array);
                reset();
            } else if (twships === 2) {
                fill(array);
                reset();
            } else if (twships === 0) {
                reset();
                fill(array);
                ships--;
            }
        }
    }
    start();
}

function shlupka (event) {
    let x = Math.floor(( Number(event.target.id) - 1) / 10);
    let y = (Number(event.target.id) - 1) % 10;
    if (shlupki > 0) {
        if (check(x,y) === true) {
            document.getElementById(event.target.id).style.background = 'red';
            allaybattlefield[x][y] = 1;
            shlupki --;
        }
    }
    if (shlupki === 0) {
        ships --;
    }
    start();
}

function newTableEnbattlefield() {
    document.getElementById('')
}

function startShoot() {

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
            document.getElementById("out").innerText = "Расположите 3 эсминца (каждая по 2 клетки)";
            document.getElementById("albattlefield").addEventListener("click", esminec);
            break;
        case 1:
            document.getElementById("out").innerText = "Расположите 4 шлюпки (каждая по 1 клетки)";
            document.getElementById("albattlefield").addEventListener("click", shlupka);
            break;
    }
    if (ships === 0) {
        startShoot();
    }
}