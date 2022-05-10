require("dotenv").config();

const { Notion: Mind } = require("@neurosity/notion");
const robot = require("robotjs");

const { chart, hkc, hkcd } = require("./modules");


(async function main() {
  const mind = new Mind();
  
  var s0 = new Array (120);
  for (i = 1; i < s0.length; i++){
    s0[i] = 0;
  }

  email = process.env.NEUROSITY_EMAIL;
  await mind.login({ email, process.env.NEUROSITY_PASSWORD }).catch(console.error);


  console.log("waiting to detect mind push");
  var flags = 0;
  var isTrigger = true; //start out assuming the system is in a off state

  mind
    .predictions(process.env.ACTION)
    .subscribe((prediction) => {
      s0 = chart(prediction.probability, s0, isTrigger);
      //console.log("mind mute probability of", prediction.probability);
      //if the model is over 80% confidence, trigger a force push if we are not muted
      //this will call the force push function
      if (prediction.probability > 0.8 && isMute){
          process.env.DEMO ? hkc(isTrigger, flags) : hkcd(isTrigger, flags);
        } ;
      //if we are unmuted(isMute is false) try to mute if we go under 80% confidence
      if (prediction.probability < 0.8 && !isTrigger){
        process.env.DEMO ? hkc(isTrigger, flags) : hkcd(isTrigger, flags);
      } ;
    });
})();