export const validateCNIC = (cnic) => /^\d{5}-\d{7}-\d{1}$/.test(cnic);
export const validatePhone = (phone) => /^((\+92)|(0092))-{0,1}3\d{2}-{0,1}\d{7}$|^03\d{2}-{0,1}\d{7}$/.test(phone);
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);