const validators = {
  number: (value) =>
    value &&
    parseInt(value.trim ? value.trim() : value) ===
      (value.trim ? value.trim() : value),
  string: (value) => true,
  required: (value) => value && (value.trim ? value.trim() : value).length,
};

export default validators;
