const space = document.querySelector(".grid");
let width = 20;
let direction = 1;
let applesEaten = [];
let result = document.querySelector(".result");
let score = 0;
result.innerHTML = score;
for(let i=0;i<400;i++){
    let square = document.createElement('div');
    space.appendChild(square);
}
let squares = document.querySelectorAll(".grid div");
let apples = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,
            20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,
            40,41,42,43,44,45,46,47,48,49,50,51,52,53,54];

function getApples(){
    for(let i=0;i<apples.length;i++){
        if(!applesEaten.includes(i)){
            squares[apples[i]].classList.add("apple");
        }
    }    
}
function removeApples(){
    for(let i=0;i<apples.length;i++){
        squares[apples[i]].classList.remove("apple");
    }    
}

function moveApples(){
    const atRigthEnd = apples[apples.length - 1] % width === width -1;
    const atLeftEnd = apples[0]%width === 0;
    removeApples();
    if(atRigthEnd){
        for(let i=0;i<apples.length;i++){
            apples[i] += width;
            direction = -1;
        }
    }
    else if(atLeftEnd){
        for(let i=0;i<apples.length;i++){
            apples[i] += width;
            direction = 1;
        }
    }
    for(let i=0;i<apples.length;i++){
        apples[i] += direction;
    }
    if(squares[currentShooter].classList.contains('apple','shooter')){
        result.innerHTML = "GAME OVER";
        clearInterval(intervalId)
    }
    for(let i=0;i<apples.length;i++){
        if(apples[i] > (squares.length)){
            result.innerHTML = 'GAME OVER and Your score is : ' + score + '/' + apples.length;
            clearInterval(intervalId)
        }
    }
    if(applesEaten.length === apples.length){
        result.innerHTML = "YOU WIN"
        clearInterval(intervalId)
    }
    getApples();
}

let intervalId = setInterval(moveApples,400);
getApples();

let currentShooter = 370;
squares[currentShooter].classList.add('shooter');
function moveShooter(e){
    squares[currentShooter].classList.remove('shooter');
    switch(e.key){
        case 'ArrowLeft':
            if(currentShooter % width !== 0){
                currentShooter -= 1;
            }
            break;
        case 'ArrowRight':
            if(currentShooter % width < width-1){
                currentShooter += 1;
            }
            break;
    }
    squares[currentShooter].classList.add("shooter");
    // console.log(currentShooter);
}
document.addEventListener('keydown',moveShooter);


function shoot(e){
    if(e.key == 'ArrowUp'){
        let bulletCurrentIndex = currentShooter;
        let bulletId;
        switch(e.key){
            case 'ArrowUp' :
                bulletId = setInterval(moveBullet,400);
        }
        // squares[bulletCurrentIndex-width].classList.add("bullet");
        // console.log(squares[bulletCurrentIndex]);
        function moveBullet(){
            squares[bulletCurrentIndex].classList.remove("bullet");
            bulletCurrentIndex -= width;
            squares[bulletCurrentIndex].classList.add("bullet");
            if(squares[bulletCurrentIndex].classList.contains('apple')){
                squares[bulletCurrentIndex].classList.remove('apple');
                squares[bulletCurrentIndex].classList.remove('bullet');
                squares[bulletCurrentIndex].classList.add('fired');

                setTimeout(() => {
                    squares[bulletCurrentIndex].classList.remove("fired")
                    },300);
                clearInterval(bulletId);

                const appleEaten = apples.indexOf(bulletCurrentIndex);
                applesEaten.push(appleEaten);
                score++;
                result.innerHTML = score;
                console.log(applesEaten);
            }
        }
    }

    // switch(e.key){
    //     case 'ArrowUp' :
    //         bulletId = setInterval(moveBullet,400);
    // }
}
document.addEventListener('keydown',shoot);