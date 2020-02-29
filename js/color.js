import {phrases,generateRandomNumber,getSuperscript} from './phrases.js';
const reset_all = ()=>{
    var blocks = document.querySelectorAll(".square");
    var rField = document.getElementById("r");
    var gField = document.getElementById("g");
    var bField = document.getElementById("b");
    var red, green, blue; //a<Color> refers to answer color
    var correctColor = Math.floor(Math.random() * 6); // storing correct block number
    var data = []; // to store all the blocks rgb color as objects
    var isCorrect = document.getElementById("message-id");
    var count=1;
    var reset = document.querySelector("#reset");
    var num = 0;
    let winner_message_displayed = false;
    isCorrect.textContent=`Start tapping below ...`;
    let changeBackground = (tile)=>{
        // generating random colors using Math.random() * (max - min) + min
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        tile.style.background = "rgb("+red+","+green+","+blue+")";
        //changing block background color
        data.push({redVal: red, greenVal: green, blueVal: blue});
    }

    for(i=0 ; i<6; i++)
    {
        changeBackground(blocks[i]);
        blocks[i].addEventListener("click", function(){
            num+=1;
            if(this.style.background===blocks[correctColor].style.background && !winner_message_displayed)
            {
                winner_message_displayed=true;
                isCorrect.textContent=`${phrases[generateRandomNumber()]} You guessed it in ${count}${getSuperscript(num)} attempt.`;
                reset.classList.remove("hide");
                for(var j=0; j<blocks.length; j++)
                    {
                        blocks[j].style.background=blocks[correctColor].style.background;
                    }
            }
            else if(count==5 && !winner_message_displayed)
            {
                isCorrect.textContent="You lose, try again!";
                for(var k=0; k<blocks.length; k++)
                    {
                    blocks[k].style.background=blocks[correctColor].style.background;
                    }
                reset.classList.remove("hide");
            }
            else if(!winner_message_displayed)
            {
                isCorrect.textContent="Oops! That is wrong...";
                this.style.background="white";
                count++;
            }
        });
    }
    var s=data[correctColor].redVal+data[correctColor].blueVal+data[correctColor].greenVal;
    let a=data[correctColor].redVal/s*100;
    let b=data[correctColor].blueVal/s*100;
    let c=data[correctColor].greenVal/s*100;
    rField.textContent=Math.round(a);
    bField.textContent=Math.round(b);
    gField.textContent=Math.round(c);
}
reset_all()

document.getElementById("reset").addEventListener("click",reset_all);
export default reset_all;