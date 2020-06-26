import Store from '../requests/localstorage.js';
import Mixpanel from './analytics/mix.js';

const fetch = ()=>{
    let settings=Store.getItem('settings');
    if(!settings){
        console.log('settings not found, setting it now');
        settings = {"Difficulty":"easy"};
        set(settings);
    }else{
        console.log('settings are available!')
    }
    return settings;
}

const set = (settings)=>{
    Store.setItem('settings',settings);
}

const show = ()=>{
    $(".settings-tbody tr").remove();
    let settings = fetch();
    const entries = Object.entries(settings);
    for(let [item, value]  of entries){
        $('table').find('.settings-tbody').append(`
            <tr>
                <th scope="row">${item}</th>
                <td>${value}</td>
            </tr>`
        );
    }
}

const update = {
    difficulty: ()=>{
        console.log('updating difficulty..');
        let difficulty = document.querySelector('input[name="difficulty-options"]:checked').getAttribute('id');
        let settings = fetch();
        Mixpanel.track_difficulty_changes({
            old:settings.Difficulty,
            new:difficulty
        })
        settings.Difficulty=difficulty;
        set(settings);
        show();
        window.location.reload()
    }
}


export default {fetch, set, show, update};