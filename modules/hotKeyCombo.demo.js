module.exports = (isTrigger, flags) => {
        // console.log("The force is strong with this one!!! flag count: " + flags);
        //I dont want to triger it more than once really wait at least 15 triggers before
        if (flags >= 15){
           //toggle the mute flag
           isTrigger = !isTrigger;
           // console.log("muted: "+ isMute);
           /*toggle mute*/
           
           //set a cool down flag in case your thinking to hard */
           flags = 0;
        };
         //if not at 15 increment and keep looking
        flags++;
        return flags;
}