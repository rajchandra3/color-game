var blocks = document.querySelectorAll(".square");
/*rfield ,gfield,bfield will be used to put value in the header*/
var rField = document.getElementById("r");
var gField = document.getElementById("g");
var bField = document.getElementById("b");
var result = document.querySelector("h2");
var count = 0;
var aRed, aBlue, aGreen, red, green, blue;
var correctColor = Math.floor(Math.random()*7);
var isCorrect;

function changeBackground(tile)
{
    // generating random colors using Math.random() * (max - min) + min
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
    var s=red+green+blue;
    var r=(red/s*100).toFixed(2);
    var g=(green/s*100).toFixed(2);
    var b=(blue/s*100).toFixed(2);
    tile.style.background = "#"+(red).toString(16)+(green).toString(16)+(blue).toString(16);
    if(correctColor===count)
        {
            rField.textContent=r;
            gField.textContent=g;
            bField.textContent=b;
            aRed =red;
            aBlue=blue;
            aGreen=green;
        }
    count+=1;
}

function checkResult()
{
    if(document.getElementById("x").innerHTML=aBlue+"<br>"+blue)//if case is correct make screen Green
        document.querySelector("body").style.backgroundColor ="#00FF00";/*changes all the tiles
    to a common color*/
    else//make screen red and change all the tiles (use reset command )
    {
        document.querySelector("body").style.backgroundColor ="#CD0000";
        /*for(var i=0 ; i<7; i++)
        {
        changeBackground(blocks[i]);
        }*/
    }
}
for(var i=0 ; i<=6; i++)
    changeBackground(blocks[i]);
//document.getElementById("x").innerHTML=red+"<br>"+green+"<br>"+blue+"<br>"+rd[i]+"<br>"+grn[i]+"<br>"+blu[i]+"<br>"+r+"<br>"+g+"<br>"+b;

