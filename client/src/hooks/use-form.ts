import { useState, useCallback } from 'react';

export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

export interface FormState {
  [key: string]: FormField;
}

export interface UseFormOptions<T> {
  /** Valeurs initiales du formulaire */
  initialValues: T;
  
  /** Fonction de validation (retourne un objet d'erreurs) */
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  
  /** Fonction appelée lors de la soumission */
  onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = useCallback(
    (field: keyof T) => (value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setIsDirty(true);

      // Valider le champ si déjà touché
      if (touched[field] && validate) {
        const newValues = { ...values, [field]: value };
        const validationErrors = validate(newValues);
        setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
      }
    },
    [values, touched, validate]
  );

  const handleBlur = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Valider le champ au blur
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
    }
  }, [values, validate]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      
      // Marquer tous les champs comme touchés
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched);

      // Valider tout le formulaire
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);

        // Si des erreurs, ne pas soumettre
        if (Object.keys(validationErrors).length > 0) {
          return;
        }
      }

      // Soumettre
      setIsSubmitting(true);
      try {
        await onSubmit(values);
        setIsDirty(false);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsDirty(false);
  }, [initialValues]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    setValues,
  };
}
