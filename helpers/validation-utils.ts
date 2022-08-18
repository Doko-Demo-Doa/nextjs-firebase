export const validationUtils = {
  isValidEmail: (input?: string) => {
    if (!input) return false;
    return /^\S+@\S+$/.test(input);
  },
};
