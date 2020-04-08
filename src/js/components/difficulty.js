import Setting from './setting.js';

const ui = ()=>{
    let difficulty = Setting.fetch().Difficulty;
    $('.difficulty-container').html(`
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-secondary ${difficulty=='easy'?'active':''}">
                <input type="radio" name="difficulty-options" id="easy" ${difficulty=='easy'?'checked':''}> Easy
            </label>
            <label class="btn btn-secondary ${difficulty=='medium'?'active':''}">
                <input type="radio" name="difficulty-options" id="medium" ${difficulty=='medium'?'checked':''}> Medium
            </label>
            <label class="btn btn-secondary ${difficulty=='hard'?'active':''}">
                <input type="radio" name="difficulty-options" id="hard" ${difficulty=='hard'?'checked':''}> Hard
            </label>
        </div>
    `);
    let buttons=document.querySelectorAll('input[name="difficulty-options"]');
    for(let btn of buttons){
        btn.addEventListener('click',Setting.update.difficulty);
    }
}

export default {ui};