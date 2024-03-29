import React from "react"
import { Form, Field } from "react-final-form"
import { styled, Box, Label, Input, Button } from "reakit"
import ItemsInput from "./ItemsInput"
import ErrorLabel from "./ErrorLabel"
import LocationInput from "./LocationInput"
import {
  composeValidators,
  required,
  mustBeNumber,
  genderValidation,
  minValue
} from "utils/forms"

const StyledInput = styled(Input)`
  border-color: #dbdbdb;
  color: #363636;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
`

const FIELDS = [
  { name: "name", label: "Name", validations: required },
  {
    name: "age",
    label: "Age",
    type: "number",
    validations: composeValidators(required, mustBeNumber, minValue(0))
  },
  {
    name: "gender",
    label: "Gender",
    validations: composeValidators(required, genderValidation)
  }
]

function SurvivorForm({ onSubmit, initialValues = {}, survivorId = null }) {
  function handleSubmit(values) {
    let formData = normalizeValues(values)
    return onSubmit(formData)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          {FIELDS.map(renderField)}
          <Label>Inventory</Label>
          <ItemsInput survivorId={survivorId} />
          <Field name="lonlat">
            {({ input }) => (
              <Box marginBottom={16}>
                <Label>Last location: {input.value}</Label>
                <LocationInput onChange={input.onChange} />
              </Box>
            )}
          </Field>
          <Button disabled={pristine || invalid}>Submit</Button>
        </form>
      )}
    />
  )
}

function renderField({ name, label, validations, type = "text" }) {
  return (
    <Field key={name} name={name} validate={validations}>
      {({ input, meta }) => (
        <Box marginBottom={16}>
          <Label>{label}</Label>
          <StyledInput {...input} type={type} />
          {(meta.error || meta.submitError) && meta.touched && (
            <ErrorLabel>{meta.error || meta.submitError}</ErrorLabel>
          )}
        </Box>
      )}
    </Field>
  )
}

export function normalizeValues(values) {
  let formData = new FormData()
  let { items = {}, ...fields } = values

  for (let [key, value] of Object.entries(fields)) {
    formData.append(`person[${key}]`, value)
  }

  let itemsData = Object.entries(items).reduce((acc, [key, value]) => {
    return acc.concat(`${key}:${value}`)
  }, [])

  formData.append("items", itemsData.join(";"))

  return formData
}

export default SurvivorForm
