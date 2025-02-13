export const hashingAccountNumber = (accountNumber: string) => {
  let starString = accountNumber?.slice(0, -4);
  let displayNumbers = accountNumber?.slice(-4);
  let Regex = /[0-9]/g;

  let HashedCharacters = starString?.replace(Regex, "*") + displayNumbers;

  return HashedCharacters;
};
