import React, { forwardRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { 
  Mail, 
  Phone, 
  Lock, 
  User, 
  Building2, 
  Globe,
  MapPin,
  Hash,
  CreditCard,
  FileText,
  LucideIcon
} from 'lucide-react';

export type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'tel' 
  | 'number' 
  | 'url'
  | 'textarea'
  | 'select';

export interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'type'> {
  /** Label affiché au-dessus du champ */
  label?: string;
  
  /** Type de champ (text, email, password, etc.) */
  type?: FormFieldType;
  
  /** Message d'erreur de validation */
  error?: string;
  
  /** Message d'aide sous le champ */
  helperText?: string;
  
  /** Icône à afficher à gauche */
  icon?: LucideIcon;
  
  /** Options pour le select */
  options?: Array<{ value: string; label: string }>;
  
  /** Nombre de lignes pour textarea */
  rows?: number;
  
  /** Validation personnalisée */
  validate?: (value: string) => string | undefined;
  
  /** Fonction appelée lors du changement */
  onValueChange?: (value: string) => void;
  
  /** Classes CSS additionnelles pour le conteneur */
  containerClassName?: string;
  
  /** Classes CSS additionnelles pour le label */
  labelClassName?: string;
  
  /** Requis */
  required?: boolean;
}

// Icônes par défaut selon le type
const getDefaultIcon = (type: FormFieldType): LucideIcon | undefined => {
  const iconMap: Record<FormFieldType, LucideIcon | undefined> = {
    email: Mail,
    password: Lock,
    tel: Phone,
    text: undefined,
    number: Hash,
    url: Globe,
    textarea: FileText,
    select: undefined,
  };
  return iconMap[type];
};

// Validations par défaut
const defaultValidations: Record<FormFieldType, (value: string) => string | undefined> = {
  email: (value) => {
    if (!value) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? undefined : 'Email invalide';
  },
  tel: (value) => {
    if (!value) return undefined;
    // Format algérien: +213 ou 0, suivi de 5, 6 ou 7, puis 8 chiffres
    // Accepte avec ou sans espaces
    const cleanValue = value.replace(/\s/g, '');
    const phoneRegex = /^(\+213|0)[5-7]\d{8}$/;
    return phoneRegex.test(cleanValue) 
      ? undefined 
      : 'Numéro invalide (ex: +213 555 123 456 ou 0555 123 456)';
  },
  url: (value) => {
    if (!value) return undefined;
    try {
      new URL(value);
      return undefined;
    } catch {
      return 'URL invalide';
    }
  },
  password: (value) => {
    if (!value) return undefined;
    if (value.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
    if (!/[A-Z]/.test(value)) return 'Le mot de passe doit contenir au moins une majuscule';
    if (!/[a-z]/.test(value)) return 'Le mot de passe doit contenir au moins une minuscule';
    if (!/[0-9]/.test(value)) return 'Le mot de passe doit contenir au moins un chiffre';
    return undefined;
  },
  text: () => undefined,
  number: () => undefined,
  textarea: () => undefined,
  select: () => undefined,
};

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
  (
    {
      label,
      type = 'text',
      error,
      helperText,
      icon,
      options,
      rows = 4,
      validate,
      onValueChange,
      containerClassName,
      labelClassName,
      required,
      className,
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalError, setInternalError] = React.useState<string | undefined>();
    const Icon = icon || getDefaultIcon(type);
    const displayError = error || internalError;

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const newValue = e.target.value;
      
      // Validation
      const validationFn = validate || defaultValidations[type];
      if (validationFn) {
        const validationError = validationFn(newValue);
        setInternalError(validationError);
      }

      // Callbacks
      onChange?.(e as any);
      onValueChange?.(newValue);
    };

    const handleBlur = (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      // Re-valider au blur si requis
      if (required && !e.target.value) {
        setInternalError('Ce champ est requis');
      }
      props.onBlur?.(e as any);
    };

    const inputClasses = cn(
      'rounded-lg border-gray-300 transition-colors',
      'text-gray-900 placeholder:text-gray-500',
      Icon && 'pl-10',
      displayError && 'border-red-500 focus:border-red-600',
      disabled && 'bg-gray-50 cursor-not-allowed text-gray-600',
      className
    );

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <Label
            htmlFor={props.id}
            className={cn(
              'text-gray-700 font-medium',
              required && "after:content-['*'] after:ml-1 after:text-red-500",
              labelClassName
            )}
          >
            {label}
          </Label>
        )}

        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
          )}

          {type === 'textarea' ? (
            <Textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled}
              rows={rows}
              className={inputClasses}
              aria-invalid={!!displayError}
              aria-describedby={
                displayError
                  ? `${props.id}-error`
                  : helperText
                  ? `${props.id}-helper`
                  : undefined
              }
              {...(props as any)}
            />
          ) : type === 'select' ? (
            <select
              ref={ref as React.Ref<HTMLSelectElement>}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled}
              className={cn(
                inputClasses,
                'appearance-none bg-white cursor-pointer',
                'bg-[url(\'data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 12 12%27%3e%3cpath fill=%27%234B5563%27 d=%27M6 9L1 4h10z%27/%3e%3c/svg%3e\')]',
                'bg-no-repeat bg-[right_0.75rem_center]',
                'pr-10'
              )}
              aria-invalid={!!displayError}
              {...(props as any)}
            >
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              ref={ref as React.Ref<HTMLInputElement>}
              type={type === 'tel' ? 'tel' : type === 'number' ? 'number' : type}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled}
              className={inputClasses}
              aria-invalid={!!displayError}
              aria-describedby={
                displayError
                  ? `${props.id}-error`
                  : helperText
                  ? `${props.id}-helper`
                  : undefined
              }
              {...props}
            />
          )}
        </div>

        {displayError && (
          <p
            id={`${props.id}-error`}
            className="text-xs text-red-600 flex items-center gap-1"
            role="alert"
          >
            <span className="inline-block w-1 h-1 rounded-full bg-red-600" />
            {displayError}
          </p>
        )}

        {helperText && !displayError && (
          <p
            id={`${props.id}-helper`}
            className="text-xs text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

// Export des icônes pour utilisation externe
export const FormIcons = {
  Mail,
  Phone,
  Lock,
  User,
  Building2,
  Globe,
  MapPin,
  Hash,
  CreditCard,
  FileText,
};
