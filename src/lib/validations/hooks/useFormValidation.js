"use client"
import { useState, useCallback, useRef } from 'react';

// Simple validation function
const validateField = async (schema, fieldName, value, allValues) => {
  try {
    // Create a partial object with the current field and all other values for cross-field validation
    const dataToValidate = { ...allValues, [fieldName]: value };
    await schema.validateAt(fieldName, dataToValidate);
    return { isValid: true, error: null };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

// Simple form validation function
const validateForm = async (schema, data) => {
  try {
    const validatedData = await schema.validate(data, { abortEarly: false });
    return { isValid: true, data: validatedData, errors: {} };
  } catch (error) {
    const errors = {};
    error.inner.forEach((err) => {
      errors[err.path] = err.message;
    });
    return { isValid: false, data: null, errors };
  }
};

export const useFormValidation = (schema, options = {}) => {
  const {
    initialValues = {},
    validateOnChange = true,
    validateOnBlur = true,
  } = options;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use refs to avoid circular dependencies
  const valuesRef = useRef(values);
  const errorsRef = useRef(errors);
  
  // Update refs when state changes
  valuesRef.current = values;
  errorsRef.current = errors;

  // Handle field change
  const handleChange = useCallback((fieldName, value) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errorsRef.current[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }

    // For password confirmation, also clear the other field's error
    if (fieldName === 'password' && errorsRef.current['confirmPassword']) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors['confirmPassword'];
        return newErrors;
      });
    }
    if (fieldName === 'confirmPassword' && errorsRef.current['password']) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors['password'];
        return newErrors;
      });
    }
  }, []);

  // Handle field blur
  const handleBlur = useCallback(async (fieldName) => {
    if (!validateOnBlur) return;
    
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const value = valuesRef.current[fieldName];
    const result = await validateField(schema, fieldName, value, valuesRef.current);
    
    if (!result.isValid) {
      setErrors(prev => ({ ...prev, [fieldName]: result.error }));
    } else {
      // Clear error if validation passes
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }, [schema, validateOnBlur]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit, onError) => {
    setIsSubmitting(true);
    
    try {
      // Mark all fields as touched
      const allFields = Object.keys(schema.fields);
      setTouched(prev => {
        const newTouched = { ...prev };
        allFields.forEach(field => {
          newTouched[field] = true;
        });
        return newTouched;
      });

      // Validate entire form
      const result = await validateForm(schema, valuesRef.current);
      
      if (result.isValid) {
        if (onSubmit) {
          await onSubmit(result.data);
        }
        return { success: true, data: result.data };
      } else {
        setErrors(result.errors);
        if (onError) {
          onError(result.errors);
        }
        return { success: false, errors: result.errors };
      }
    } catch (error) {
      const errorMessage = 'Submission failed';
      if (onError) {
        onError({ general: errorMessage });
      }
      return { success: false, errors: { general: errorMessage } };
    } finally {
      setIsSubmitting(false);
    }
  }, [schema]);

  // Helper function to check if nested field is touched
  const isNestedFieldTouched = useCallback((fieldPath) => {
    // Check if the field path or any parent array field is touched
    if (touched[fieldPath]) return true;
    
    // For array fields like documents[0].description, check if documents is touched
    const arrayMatch = fieldPath.match(/^([^[]+)\[\d+\]\..+$/);
    if (arrayMatch) {
      return touched[arrayMatch[1]];
    }
    
    return false;
  }, [touched]);

  // Utility functions
  const hasFieldError = useCallback((fieldName) => {
    // Check direct field error
    if (errorsRef.current[fieldName] && touched[fieldName]) {
      return true;
    }
    
    // Check nested field error (e.g., documents[0].description)
    if (errorsRef.current[fieldName] && isNestedFieldTouched(fieldName)) {
      return true;
    }
    
    return false;
  }, [touched, isNestedFieldTouched]);

  const getFieldError = useCallback((fieldName) => {
    return errorsRef.current[fieldName] || '';
  }, []);

  // New utility function to get nested field errors specifically for array fields
  const getNestedFieldError = useCallback((arrayFieldName, index, nestedFieldName) => {
    const errorPath = `${arrayFieldName}[${index}].${nestedFieldName}`;
    return errorsRef.current[errorPath] || '';
  }, []);

  // New utility function to check if nested field has errors
  const hasNestedFieldError = useCallback((arrayFieldName, index, nestedFieldName) => {
    const errorPath = `${arrayFieldName}[${index}].${nestedFieldName}`;
    return !!(errorsRef.current[errorPath] && (touched[arrayFieldName] || touched[errorPath]));
  }, [touched]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    hasFieldError,
    getFieldError,
    hasNestedFieldError,
    getNestedFieldError,
    resetForm,
  };
}; 