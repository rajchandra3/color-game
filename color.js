var blocks = document.querySelectorAll(".square");
var rField = document.getElementById("r");
var gField = document.getElementById("g");
var bField = document.getElementById("b");
var result = document.querySelector("h2"); //to show wrong or right
var aRed, aBlue, aGreen, red, green, blue; //a<Color> refers to answer color
var correctColor = Math.floor(Math.random() * 6); // storing correct block number
var data = []; // to store all the blocks rgb color as objects
var isCorrect = document.querySelector("h2");
var reset = document.querySelector("#reset");
var num = 0;
function changeBackground(tile)
{
    // generating random colors using Math.random() * (max - min) + min
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
    tile.style.background = "rgb("+red+","+green+","+blue+")";
    //changing block background color
    data.push({redVal: red, greenVal: green, blueVal: blue});
}


for(var i=0 ; i<6; i++)
{
    changeBackground(blocks[i]);
    blocks[i].addEventListener("click", function(){
        num+=1;
        if(this.style.background===blocks[correctColor].style.background)
        {
            if(num===1)
            {
                isCorrect.textContent="Congratulations! You guessed it in 1st try! You Rock!";
            }
            else if(num===2)
            {
                isCorrect.textContent="Daaamn! You're  a Guessing Guru. You guessed it in the 2nd try.";
            }
            else if(num===3)
            {
                isCorrect.textContent="Nice! it took you 3 tries to guess correctly.";
            }
            else if(num==6)
            {
                isCorrect.textContent="Try again, maybe?";
            }
            else
            {
                isCorrect.textContent="Congratulations! You're getting better at this";
            }
            
            reset.classList.remove("hide");
            for(var i=0; i<blocks.length; i++)
                {
                    blocks[i].style.background=blocks[correctColor].style.background;
                }
        }
        else
        {
            isCorrect.textContent="Oops! That is wrong...";
            this.style.background="white";
        }
        });
}
var s=data[correctColor].redVal+data[correctColor].blueVal+data[correctColor].greenVal;
a=data[correctColor].redVal/s*100;
b=data[correctColor].blueVal/s*100;
c=data[correctColor].greenVal/s*100;
rField.textContent=a.toFixed(1);
bField.textContent=b.toFixed(1);
gField.textContent=c.toFixed(1);
