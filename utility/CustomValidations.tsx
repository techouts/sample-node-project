//Update object just merges two objects into one

export const updateObject = (oldObject: any, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

//Element detail takes in validation rules and prepares an object with all validation rules set ,to be used in check validity
export const elementDetail = (
  value = "",
  required = true,
  valid = true,
  minLength: boolean | number = false,
  maxLength: boolean | number = false,
  isNumeric = false,
  isEmail = false,
  isAlphaNumaric = false,
  isOfValidPassportFormat = false,
  isDate = false,
  formattedValue = "",
  isOnlySingleWord = false
) => {
  return {
    value: value,
    formattedValue: formattedValue,
    validation: {
      required: required,
      minLength: minLength,
      maxLength: maxLength,
      isNumeric: isNumeric,
      isEmail: isEmail,
      isAlphaNumaric: isAlphaNumaric,
      isOfValidPassportFormat: isOfValidPassportFormat,
      isDate: isDate,
      isOnlySingleWord: isOnlySingleWord,
    },
    valid: valid,
    touched: false,
  };
};

//check validity takes in validation rules and entered value and responds weather rules passed or not
export const checkValidity = (
  value: string,
  rules: {
    required: any;
    minLength: number;
    maxLength: number;
    isEmail: String;
    isNumeric: String;
    isAlphaNumaric: String;
    isOfValidPassportFormat: String;
    isDate: any;
    isOnlySingleWord: any;
  }
) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength && value.trim() !== "") {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail && value.trim() !== "") {
    const pattern = /^[a-z0-9@._$*#!%&'+/=?^_`{|}~-]*$/;

    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric && value.trim() !== "") {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isAlphaNumaric && value.trim() !== "") {
    const pattern = /^[0-9a-z]+$/i;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isOfValidPassportFormat && value.trim() !== "") {
    const pattern = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isOnlySingleWord && value.trim() !== "") {
    const pattern = /^[\w]+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};
