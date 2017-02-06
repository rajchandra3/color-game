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
        if(this.style.background===blocks[correctColor].style.background)
        {
            isCorrect.textContent="Congratulations! You guessed it !!"
            reset.classList.remove("hide");
            for(var i=0; i<blocks.length; i++)
                {
                    blocks[i].style.background=blocks[correctColor].style.background;
                }
        }
        else
        {
            isCorrect.textContent="Opps! That was wrong...";
            this.style.background="rgb(23,23,23)";
        }
        });
}
isCorrect.textContent=data[correctColor].redVal+<br>data[correctColor].blueVal+<br>data[correctColor].greenVal;
rField.textContent=data[correctColor].redVal;
bField.textContent=data[correctColor].blueVal;
gField.textContent=data[correctColor].greenVal;
