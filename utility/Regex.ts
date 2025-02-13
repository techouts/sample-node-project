// Regex pattern doesn't allow Special characters and doesn't start with Zero
export const PhoneNumberValidationRegex = /^[2-9]\d{10}$/;

export const PhoneNumberValidationRegexMyProfile = /^[2-9]\d{9}$/;
// Regex pattern doesn't allow Special characters and doesn't start with Zero
export const PinCodeValidationRegex = /^[0-9]\d{5}$/;

// Regex pattern doesn't allow Special characters and doesn't start with Zero
export const UserNameRegex = /^[a-zA-Z0-9 ]{0,50}$/;

export const CommonRegexes = {
  whitespace: /\s/g,
  splCharacters: /[^a-zA-Z0-9-]+/g,
  urlProtocol: /^https?\:\/\//i,
  numeric: /^[0-9]*$/,
};
