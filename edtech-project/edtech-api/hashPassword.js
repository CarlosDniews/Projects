const bcrypt = require("bcryptjs");

const plainPassword = "admin";

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(plainPassword, salt, (err, hash) => {
    if (err) throw err;
    console.log("Sua senha original:", plainPassword);
    console.log("---");
    console.log("Copie este hash para o banco de dados:");
    console.log(hash);
  });
});
