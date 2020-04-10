//any random event 
const track=(event,properties)=>{
    mixpanel.track( event, properties );
}

//track gameplayed
const track_gameplay=(gameplay)=>{
    mixpanel.track('GAMEPLAYED',{
        attempts:gameplay.attempts,
        won:gameplay.won,
        difficulty:gameplay.difficulty
    });
}

const track_user=(user)=>{
    mixpanel.identify(user.email);
    mixpanel.people.set({
        name:user.name.fullname,
        uid:user.uid,
        picture:user.picture
    });
}

const track_difficulty_changes=(props)=>{
    mixpanel.track("DIFFICULTY_CHANGED",{
        "previous":props.old,
        "new":props.new
    });
}

export default {
    track,
    track_gameplay,
    track_user,
    track_difficulty_changes
}
