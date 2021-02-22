const validators = {
  number: (value) => !isNaN(value),
  string: () => true,
  required: (value) => {
    return value && typeof value === "string"
      ? value && value.trim && value.trim().length
      : value !== "";
  },
};

export default validators;
