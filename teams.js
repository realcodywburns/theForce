const { Notion: Mind } = require("@neurosity/notion");
const robot = require("robotjs");
const { email, password } = require("./auth");

(async function main() {
  const mind = new Mind();
  await mind.login({ email, password }).catch(console.error);

  console.log("waiting to detect mind push");

  function theForce(){
      console.log("The force is strong with this one!!!")
    //I dont want to triger it more than once really wait at least 15 triggers before
      if (flags >= 15){
        //toggle the mute flag
        isMute = !isMute;
        console.log("muted: "+ isMute);
        //toggle mute
        robot.keyToggle("control","down","shift");
        robot.keyTap("m");
        robot.keyToggle("control","up","shift");
        //set a cool down flag in case your thinking to hard
        flags = -15;
        };
      //if not at 15 increment and keep looking
      flags++;
  }

  var flags = 0;
  var isMute = true;

  mind
    .predictions("push")
    .subscribe((prediction) => {
      console.log("mind push probability of", prediction.probability);
      if (prediction.probability > 0.8){
          theForce();
        } ;
    });
})();