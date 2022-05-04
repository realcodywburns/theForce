const { Notion: Mind } = require("@neurosity/notion");
const { exec } = require("child_process");
const { email, password } = require("./auth");

(async function main() {
  const mind = new Mind();
  await mind.login({ email, password }).catch(console.error);

  console.log("waiting to detect mind push");

  function theForce(){
      console.log("The force is strong with this one!!!")
    //I dont want to triger it more than once really wait at least 15 triggers before
      if (flags >= 15){
        exec(
           "git add . && git commit -m 'force push' && git push",
           (err, stdout, stderr) => {
             console.log(err ? stderr : stdout);
             process.exit();
           }
         );
        };
      //if not at 15 increment and keep looking
      flags++;
  }

  var flags = 0;
  mind
    .predictions("push")
    .subscribe((prediction) => {
      console.log("mind push probability of", prediction.probability);
      if (prediction.probability > 0.8){
          theForce();
        } ;
    });
})();