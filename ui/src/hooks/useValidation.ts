import { useState } from 'react';

import { ValidationRule } from 'src/types';

export default (): {
  errors: { [key: string]: string };
  touched: { [key: string]: boolean };
  validate: (fields: { [key: string]: ValidationRule }) => boolean;
  handleBlur: (field: string) => void;
} => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const validate = (fields: { [key: string]: ValidationRule }) => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};
    for (const key in fields) {
      if (!fields[key].rule(fields[key].value)) {
        newErrors[key] = fields[key].message;
        valid = false;
      }
    }
    setErrors(newErrors);
    setTouched(Object.keys(fields).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return valid;
  };

  const handleBlur = (field: string) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  return {
    errors,
    touched,
    validate,
    handleBlur,
  };
};
