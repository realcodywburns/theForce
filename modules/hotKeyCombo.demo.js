module.exports = (state) => {
        // console.log("The force is strong with this one!!! flag count: " + flags);
        //I dont want to triger it more than once really wait at least 15 triggers before
        if (state.flags >= 15){
           //toggle the mute flag
           state.isTrigger = !state.isTrigger;
           // console.log("muted: "+ isMute);
           /*toggle mute*/
           
           //set a cool down flag in case your thinking to hard */
           state.flags = 0;
        };
         //if not at 15 increment and keep looking
         state.flags++;
        return state;
}