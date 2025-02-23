export const normalizePhone = (phoneNumber: any) => {
  const x =
    phoneNumber &&
    phoneNumber.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  return !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ""}`;
};

export const stripLetters = (str: string) => {
  return "+1" + str.replace(/\D/g, "");
};
