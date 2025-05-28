import type { FieldPath, FieldValues } from 'react-hook-form'
import * as React from 'react'

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> { name: TName }

export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

interface FormItemContextValue { id: string }

export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)
