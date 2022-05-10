const { Notion: Mind } = require("@neurosity/notion");
const robot = require("robotjs");
const { email, password } = require("./auth");
const chart  = require("./chart");


(async function main() {
  const mind = new Mind();
  
  var s0 = new Array (120);
  for (i = 1; i < s0.length; i++){
    s0[i] = 0;
  }

  await mind.login({ email, password }).catch(console.error);

  console.log("waiting to detect mind push");

  function theForce(){
     // console.log("The force is strong with this one!!! flag count: " + flags);
    //I dont want to triger it more than once really wait at least 15 triggers before
      if (flags >= 15){
        //toggle the mute flag
        isMute = !isMute;
       // console.log("muted: "+ isMute);
        /*toggle mute*/
        robot.keyToggle("control","down","shift");
        robot.keyTap("m");
        robot.keyToggle("control","up","shift");
        //set a cool down flag in case your thinking to hard */
        flags = 0;
        };
      //if not at 15 increment and keep looking
      flags++;
  }

  var flags = 0;
  var isMute = true; //start out assuming the system is muted

  mind
    .predictions("push")
    .subscribe((prediction) => {
      s0 = chart(prediction.probability, s0, isMute);
      //console.log("mind mute probability of", prediction.probability);
      //if the model is over 80% confidence, trigger a force push if we are not muted
      //this will call the force push function
      if (prediction.probability > 0.8 && isMute){
          theForce();
        } ;
      //if we are unmuted(isMute is false) try to mute if we go under 80% confidence
      if (prediction.probability < 0.8 && !isMute){
        theForce();
      } ;
    });
})();