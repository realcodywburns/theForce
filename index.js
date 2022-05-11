require("dotenv").config();

const { Notion: Mind } = require("@neurosity/notion");
const { chart, hkc, hkcd, auth} = require("./modules");


(async function main() {
  var mind = new Mind();
  //login
  mind = await auth(mind);

  //build array for chartData
  
  var state = {
    flags : 0,
    isTrigger : false,
    s0 : new Array (120),
  }

  for (i = 1; i < state.s0.length; i++){
    state.s0[i] = 0;
  }
  

  console.log('awaiting mind signal');
  mind
    .predictions(process.env.ACTION)
    .subscribe((prediction) => {
      //draw the chart
      state = chart(prediction.probability, state);
      switch(process.env.TYPE){
        case 'hold' :
          //if the model is over threshold confidence, trigger a the action
          //this will call the force push function
          if (prediction.probability > process.env.THRESHOLD && state.isTrigger){
          //this is the function called when trigger is pushed
            state = !process.env.DEMO ? hkc(state) : hkcd(state);
          } 
          //if isTrigger is false, try to trigger if we go under threashold confidence
          if (prediction.probability < process.env.THRESHOLD && !state.isTrigger){
            state = !process.env.DEMO ? hkc(state) : hkcd(state);
          } ;
          break;
        default:
          //default action is to single tap key, off -on toggle
          if (prediction.probability > process.env.THRESHOLD){
            state = !process.env.DEMO ? hkc(state) : hkcd(state);
          } ;
      }
    });
})();