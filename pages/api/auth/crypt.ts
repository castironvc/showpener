import SimpleCrypto from "simple-crypto-js";
export const passEncrypt = (pass: string) => {
  if (pass) {
    var _secretKey = process.env.CRYPT_TOKEN;
    var simpleCrypto = new SimpleCrypto(_secretKey);
    return simpleCrypto.encrypt(pass);
  } else {
    return pass;
  }
};

export const passDecrypt = (pass: string) => {
  if (pass) {
    var _secretKey = process.env.CRYPT_TOKEN;
    var simpleCrypto = new SimpleCrypto(_secretKey);
    return simpleCrypto.decrypt(pass);
  } else {
    return pass;
  }
};
