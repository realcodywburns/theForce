var asciichart = require ('asciichart')

var config = {};

module.exports = (newData, chartData, isMute) => {
    chartData.shift();
    chartData.push(newData);
    //if we are not muted change to green color
    if (!isMute){
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
    console.clear();
    console.log (asciichart.plot (chartData,config));
    console.log('\x1b[31m', "muted");
    console.log('\x1b[32m', "unmuted");

  
    return chartData;
}

