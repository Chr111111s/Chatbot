export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePhone = (phone) => {
  const re = /^\d{10}$/;
  return re.test(phone);
};

export const validateFullName = (fullName) => {
  const re = /^[a-zA-Z\s]+$/;
  return re.test(fullName);
};

export const validateLastName = (lastName) => {
  const re = /^[a-zA-Z\s]+$/;
  return re.test(lastName);
};

export const validateSecondLastName = (seconndLastName) => {
  const re = /^[a-zA-Z\s]+$/;
  return re.test(seconndLastName);
};
