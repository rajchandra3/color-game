import {phrases,generateRandomNumber,getSuperscript,rgbToHex} from './common.js';
import StateManager from './states/state_manager.js';
import Gameplay from './requests/components/gameplay.js';

const initializeGame = ()=>{
    let colors={
        red:getRandomColor(),
        green:getRandomColor(),
        blue:getRandomColor()
    };
    return ({
        attempts:1,
        message_displayed:false,
        correct_color:{
            color:colors,
            position:Math.floor(Math.random() * 6),
            toHex:{
                red:rgbToHex(colors.red),
                green:rgbToHex(colors.green),
                blue:rgbToHex(colors.blue)
            },
            percentage:{
                red:Math.round(colors.red/256*100),
                green:Math.round(colors.green/256*100),
                blue:Math.round(colors.blue/256*100)
            }
        },
        hard:50,
        medium:120,
        easy:256,
        options:[],
        message_block:document.getElementById("message-id"),
        tiles:document.querySelectorAll(".square")
    })
}

const getRandomColor = ()=>{
    return (Math.floor(Math.random() * 256));
    // switch(level){
    //     case 'easy':
    //         return (Math.floor(Math.random() * 256));
    //     case 'medium':
    //         return (Math.floor(Math.random() * 256));
    //     case 'hard':
    //     default:
    //         return (Math.floor(Math.random() * 256));
    // }
}

const paint_with_color = (tiles,color)=>{
    let bg_color=`rgb(${color.red},${color.green},${color.blue})`;
    for(let tile of tiles){
        tile.style.background=bg_color;
    }
}

const paint_tile_randomly = (tile,game_vars)=>{
    let color_exists=false;
    while(!color_exists){
        let random_color={red: getRandomColor(), green: getRandomColor(), blue: getRandomColor()};
        for(let option of game_vars.options){
            if(
                option.red==random_color.red ||
                option.green==random_color.green ||
                option.blue==random_color.blue
            ){
                color_exists=true;
                break;
            }
        }
        if(!color_exists){
            tile.style.background = `rgb(${random_color.red},${random_color.green},${random_color.blue})`;
            return (random_color); //changing block background color
        }
    }
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

const click_handler = (e,game_vars)=>{
    //user won
    if(game_vars.attempts>0 && game_vars.attempts<=5 && e.target.style.background===game_vars.tiles[game_vars.correct_color.position].style.background && !game_vars.message_displayed)
    {
        game_vars.message_block.textContent=`${phrases[generateRandomNumber()]} It was ${game_vars.correct_color.hex_format}, you got it in ${game_vars.attempts}${getSuperscript(game_vars.attempts)} attempt.`;
        game_vars.message_displayed=true;
        paint_with_color(game_vars.tiles,game_vars.correct_color.color);
        restart_game_cta('show');
        Gameplay.add(true,game_vars.attempts); //save gameplays
    }
    //user lost
    else if(game_vars.attempts==5 && !game_vars.message_displayed)
    {
        game_vars.message_block.textContent="You lose, try again!";
        game_vars.message_displayed=true;
        paint_with_color(game_vars.tiles,game_vars.correct_color.color);
        restart_game_cta('show');
        Gameplay.add(false,game_vars.attempts); //save gameplays
    }
    //user still has more attempts
    else if(!game_vars.message_displayed)
    {
        game_vars.message_block.textContent="Oops! That is wrong...";
        e.target.style.background="white";
        game_vars.attempts++;
    }
}

const paint_game = (game_vars)=>{
    let blocks = game_vars.tiles;
    for(let i=0;i<6;i++) {
        if(i!==game_vars.correct_color.position){
            let option=paint_tile_randomly(blocks[i],game_vars);
            option?game_vars.options.push(option):--i;
            blocks[i].addEventListener("click",(e)=>{
                click_handler(e,game_vars);
            });
        }else{
            game_vars.options.push(game_vars.correct_color.color);
            blocks[i].style.background = `rgb(${game_vars.correct_color.color.red},${game_vars.correct_color.color.green},${game_vars.correct_color.color.blue})`;;
            blocks[i].addEventListener("click",(e)=>{
                click_handler(e,game_vars);
            });
        }
    }
}

const label_generators = (percentage)=>{
    var activeBorders = document.querySelectorAll("#activeBorder");
    let i=0;
    for (let [color_name, color_value] of Object.entries(percentage)) {
        let prec = color_value;
        let deg = prec*3.6;
        let active_color=`${color_name=='red'?'#ff0000':color_name=='green'?'#00ff00':'#0000ff'}`;
        let bg_color=`${color_name=='red'?'#ff9999':color_name=='green'?'#99ff99':'#9999ff'}`;
        activeBorders[i].style.backgroundColor=active_color;
        if (deg <= 180){
            activeBorders[i].style.backgroundImage=`linear-gradient(${(90+deg)}deg, transparent 50%, ${bg_color} 50%),linear-gradient(90deg, ${bg_color} 50%, transparent 50%)`;
        }
        else{
            activeBorders[i].style.backgroundImage=`linear-gradient(${(deg-90)}deg, transparent 50%, ${active_color} 50%),linear-gradient(90deg, ${bg_color} 50%, transparent 50%)`;
        }
        document.querySelector(`.c-${color_name}`).textContent=color_value;
        activeBorder[i].style.transform=`rotate(0deg)`;
        document.querySelector(`#circle-${color_name}`).style.transform=`rotate(0deg)`;
        i++;
    }
}

const start = ()=>{
    restart_game_cta('hide');
    StateManager.handle_state_change();
    const game_vars = initializeGame();
    game_vars.message_block.textContent=`Start tapping below ...`;
    game_vars.correct_color.hex_format=`#${game_vars.correct_color.toHex.red}${game_vars.correct_color.toHex.green}${game_vars.correct_color.toHex.blue}`;
    label_generators(game_vars.correct_color.percentage);
    // document.getElementById("r").textContent=Math.round(game_vars.correct_color.color.red/256*100);
    // document.getElementById("red-label").style.background=`rgb(${game_vars.correct_color.color.red},255,255)`;
    // document.getElementById("g").textContent=Math.round(game_vars.correct_color.color.green/256*100);
    // document.getElementById("green-label").style.background=`rgb(255,${game_vars.correct_color.color.green},255)`;
    // document.getElementById("b").textContent=Math.round(game_vars.correct_color.color.blue/256*100);
    // document.getElementById("blue-label").style.background=`rgb(255,255,${game_vars.correct_color.color.blue})`;
    paint_game(game_vars);
}

start();

//button for start again
document.getElementById("reset-btn").addEventListener("click",start);
