const validators = {
  number: (value) => !isNaN(value),
  string: () => true,
  required: (value) => {
    // console.log(
    //   value,
    //   typeof value,
    //   value && value.trim && value.trim().length,
    //   "not null",
    //   value != null
    // );
    return value && typeof value === "string"
      ? value && value.trim && value.trim().length
      : value !== "";
  },
};

export default validators;
