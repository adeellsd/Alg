"use client"

import React, { forwardRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
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
  ChevronDown,
  type LucideIcon,
} from "lucide-react"

export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "number"
  | "url"
  | "textarea"
  | "select"

export interface FormFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    "type"
  > {
  label?: string
  type?: FormFieldType
  error?: string
  helperText?: string
  icon?: LucideIcon
  options?: Array<{ value: string; label: string }>
  rows?: number
  validate?: (value: string) => string | undefined
  onValueChange?: (value: string) => void
  containerClassName?: string
  labelClassName?: string
  required?: boolean
}

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
  }
  return iconMap[type]
}

const defaultValidations: Record<
  FormFieldType,
  (value: string) => string | undefined
> = {
  email: (value) => {
    if (!value) return undefined
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) ? undefined : "Email invalide"
  },
  tel: (value) => {
    if (!value) return undefined
    const cleanValue = value.replace(/\s/g, "")
    const phoneRegex = /^(\+213|0)[5-7]\d{8}$/
    return phoneRegex.test(cleanValue)
      ? undefined
      : "Numéro invalide (ex: +213 555 123 456)"
  },
  url: (value) => {
    if (!value) return undefined
    try {
      new URL(value)
      return undefined
    } catch {
      return "URL invalide"
    }
  },
  password: (value) => {
    if (!value) return undefined
    if (value.length < 8) return "Minimum 8 caractères"
    if (!/[A-Z]/.test(value)) return "Ajoutez une majuscule"
    if (!/[a-z]/.test(value)) return "Ajoutez une minuscule"
    if (!/[0-9]/.test(value)) return "Ajoutez un chiffre"
    return undefined
  },
  text: () => undefined,
  number: () => undefined,
  textarea: () => undefined,
  select: () => undefined,
}

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(
  (
    {
      label,
      type = "text",
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
    const [internalError, setInternalError] = useState<string | undefined>()
    const Icon = icon || getDefaultIcon(type)
    const displayError = error || internalError

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const newValue = e.target.value
      const validationFn = validate || defaultValidations[type]
      if (validationFn) {
        setInternalError(validationFn(newValue))
      }
      onChange?.(e as React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>)
      onValueChange?.(newValue)
    }

    const handleBlur = (
      e: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      if (required && !e.target.value) {
        setInternalError("Ce champ est requis")
      }
      props.onBlur?.(e as React.FocusEvent<HTMLInputElement & HTMLTextAreaElement>)
    }

    const baseInputClasses = cn(
      "h-10 w-full rounded-lg border border-gray-200 bg-white text-gray-900",
      "placeholder:text-gray-400",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-0",
      "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
      Icon && "pl-10",
      displayError && "border-red-500 focus-visible:ring-red-500",
      className
    )

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <Label
            htmlFor={props.id}
            className={cn(
              "text-sm font-medium text-gray-700",
              required && "after:ml-0.5 after:text-red-500 after:content-['*']",
              labelClassName
            )}
          >
            {label}
          </Label>
        )}

        <div className="relative">
          {Icon && (
            <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          )}

          {type === "textarea" ? (
            <Textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled}
              rows={rows}
              className={cn(baseInputClasses, "h-auto py-2.5", Icon && "pl-10")}
              aria-invalid={!!displayError}
              aria-describedby={
                displayError
                  ? `${props.id}-error`
                  : helperText
                    ? `${props.id}-helper`
                    : undefined
              }
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : type === "select" ? (
            <div className="relative">
              <select
                ref={ref as React.Ref<HTMLSelectElement>}
                value={value as string}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                className={cn(
                  baseInputClasses,
                  "cursor-pointer appearance-none pr-10"
                )}
                aria-invalid={!!displayError}
                {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
              >
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            </div>
          ) : (
            <Input
              ref={ref as React.Ref<HTMLInputElement>}
              type={type === "tel" ? "tel" : type === "number" ? "number" : type}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled}
              className={baseInputClasses}
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
            className="flex items-center gap-1.5 text-sm text-red-600"
            role="alert"
          >
            <span className="size-1 rounded-full bg-red-600" />
            {displayError}
          </p>
        )}

        {helperText && !displayError && (
          <p id={`${props.id}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = "FormField"

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
}