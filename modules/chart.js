var asciichart = require ('asciichart')

var config = {};

module.exports = (newData, state) => {
    state.s0.shift();
    state.s0.push(newData);
    //change to green means trigger pressed
    if (state.isTrigger){
        config = {
            height:  5,         // any height you want
            colors: [
                asciichart.green,
            ]
        }       
    } else {
        config = {
            height:  5,         // any height you want
            colors: [
                asciichart.red,
            ]
        }       
    }
    var bars = "Flags: "
    for(i=0; i < state.flags; i++){
        bars = bars + "#"
    } 

    console.clear();
    console.log (asciichart.plot ( state.s0, config ));
    console.log('\x1b[31m', "Awaiting",'\x1b[32m', "Activated");

    console.log(bars)

  
    return state;
}

