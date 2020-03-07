let update_profile_data = (user)=>{
    const success_percentage = user.total_success/user.total_game_play*100;
    const failure_percentage = user.total_failure/user.total_game_play*100;
    document.getElementById('success-pbar').style.width = `${success_percentage}%`;
    document.getElementById('success-pbar').setAttribute('aria-valuenow',`${success_percentage}`);
    document.getElementById('success-pbar').innerHTML=`<b>wins (${user.total_success})</b>`;
    document.getElementById('failure-pbar').style.width = `${failure_percentage}%`;
    document.getElementById('failure-pbar').setAttribute('aria-valuenow',`${failure_percentage}`);
    document.getElementById('failure-pbar').innerHTML=`<b>losses (${user.total_failure})</b>`;
}

export default {update_profile_data};