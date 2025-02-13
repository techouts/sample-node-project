export const handleKeyDownTextField = ({
  event,
  type,
}: {
  event: any;
  type?: string;
}) => {
  switch (type) {
    case "mobile": {
      return handleMobileNumberValidation(event);
    }
    case "firstName": {
      return handleNumbersSpecialCharWithSpaceRestrictions(event);
    }
    case "lastName": {
      return handleNumbersSpecialCharRestrictions(event);
    }
    case "email": {
      return handleEmailValidation(event);
    }
  }
};

export const handleMobileNumberValidation = (event: any) => {
  let keyCharCode = event.keyCode;
  if (["e", "E", "+", "-", ".", "Unidentified"]?.includes(event.key)) {
    event.preventDefault();
  }
  // Allowing Numbers and restricting all other characters
  if (keyCharCode >= 48 && keyCharCode <= 57) {
    return true;
  }
  return false;
};

//allows only alphabets with out space
export const handleNumbersSpecialCharRestrictions = (event: any) => {
  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z]+$/;
  if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
    event.preventDefault();
  }
};

//allows only alphabets & space
export const handleNumbersSpecialCharWithSpaceRestrictions = (event: any) => {
  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z ]+$/;
  if (!ALPHA_NUMERIC_DASH_REGEX.test(event?.key)) {
    event.preventDefault();
  }
};

export const handleEmailValidation = (event: any) => {
  const EMAIL_REGEX = /^[a-zA-Z0-9_.@]+$/;
  if (!EMAIL_REGEX.test(event.key)) {
    event.preventDefault();
  }
};

export const ACCEPT_ONLY_NUMBERS = /^[0-9]+$/;

export const validateFirstName = (str: string) => {
  str = str?.trim();
  const regex = /^[A-Za-z]+(\s[A-Za-z]+){0,2}$/;
  return regex.test(str);
};
export const validateLastName = (str: string) => {
  str = str?.trim();
  const regex = /^[a-zA-Z]+$/;
  return regex.test(str);
};

export type ContactUsErrorType = { error: boolean; message: string; type: string }