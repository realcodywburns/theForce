const { argv } = require("yargs");


module.exports = async (mind) => {
  var email = "email" in argv ? argv.email : process.env.NEUROSITY_EMAIL;
  var password ="password" in argv ? argv.password : process.env.NEUROSITY_PASSWORD;
  console.log('Attempting login...');
  await mind.login( { email, password })
  .then(console.log('login successful'))
  .catch(console.error);
  return mind;  
 
};