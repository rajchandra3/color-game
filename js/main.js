import {phrases,generateRandomNumber,getSuperscript} from './common.js';
import StateManager from './states/state_manager.js';
import Gameplay from './requests/components/gameplay.js';
import Config from './requests/config.js';
import Stats from './requests/components/user_stats.js';

//put css in html
if(Config.env==='production'){
    document.querySelector('head').innerHTML += `
    <link rel="stylesheet" type="text/css" href="/css/min/color.min.css">
    <link rel="stylesheet" type="text/css" href="/css/min/profile.min.css">
    `;
}else{
    document.querySelector('head').innerHTML += `
    <link rel="stylesheet" type="text/css" href="/css/color.css">
    <link rel="stylesheet" type="text/css" href="/css/profile.css">
    `;
}

const getRandomColor = ()=>{return (Math.floor(Math.random() * 256));}

const paint_all_tiles = (tiles,color)=>{
    for(let tile of tiles){
        tile.style.background=tiles[color].style.background;
    }
}

const paint_tile_randomly = (tile)=>{
    // generating random colors using Math.random() * (max - min) + min
    let random_color={red: getRandomColor(), green: getRandomColor(), blue: getRandomColor()};
    tile.style.background = `rgb(${random_color.red},${random_color.green},${random_color.blue})`;;
    return (random_color); //changing block background color
}

const restart_game_cta = (choice)=>{
    let reset = document.getElementById("reset-btn");
    switch(choice){
        case 'show':
            reset.classList.remove("invisible");
            reset.classList.add("visible");
            break;
        case 'hide':
            reset.classList.remove("visible");
            reset.classList.add("invisible");
            break;
        default:
            reset.classList.add("visible");
            reset.classList.remove("invisible");
    }
}

const reset_all = ()=>{
    restart_game_cta('hide')
    StateManager.handle_state_change();
    let blocks = document.querySelectorAll(".square");
    const correct_color_pos = Math.floor(Math.random() * 6); // storing correct tile number
    let data = []; // to store all the blocks rgb color as objects
    let message_block = document.getElementById("message-id");
    // let num=1;
    let num = 1;
    let message_displayed = false;
    message_block.textContent=`Start tapping below ...`;

    for(let i=0;i<6;i++) {
        data.push(paint_tile_randomly(blocks[i]));
        blocks[i].addEventListener("click",(e)=>{
            console.log(num);
            //user won
            if(num>0 && num<5 && e.target.style.background===blocks[correct_color_pos].style.background && !message_displayed)
            {
                message_block.textContent=`${phrases[generateRandomNumber()]} You guessed it in ${num}${getSuperscript(num)} attempt.`;
                message_displayed=true;
                paint_all_tiles(blocks,correct_color_pos);
                restart_game_cta('show');
                Gameplay.add(true,num); //save gameplays
            }
            //user lost
            else if(num==5 && !message_displayed)
            {
                message_block.textContent="You lose, try again!";
                message_displayed=true;
                paint_all_tiles(blocks,correct_color_pos);
                // e.target.style.background="white"; //make this tile white
                restart_game_cta('show');
                Gameplay.add(false,num); //save gameplays
            }
            //user still has more attempts
            else if(!message_displayed)
            {
                message_block.textContent="Oops! That is wrong...";
                e.target.style.background="white";
                num++;
            }
        });
    }

    //set color value in rgb labels
    let r=data[correct_color_pos].red/256*100;
    let g=data[correct_color_pos].green/256*100;
    let b=data[correct_color_pos].blue/256*100;
    document.getElementById("r").textContent=Math.round(r);
    document.getElementById("g").textContent=Math.round(g);
    document.getElementById("b").textContent=Math.round(b);
}

reset_all();

//button for start again
document.getElementById("reset-btn").addEventListener("click",reset_all);

//leaderboard trigger button
document.getElementById('nav-leaderboard-tab').addEventListener('click',Stats.leaderboard);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', ()=> {
        navigator.serviceWorker.register('/service_worker.js').then((registration)=> {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, (err)=> {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}