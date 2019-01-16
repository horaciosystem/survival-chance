import React from "react"
import { Form, Field } from "react-final-form"
import { Label, Input, Button } from "reakit"
import ItemsInput from "./ItemsInput"

const required = value => (value ? undefined : "Required")

const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined)

const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

function SurvivorForm({ onSubmit }) {
  function handleSubmit(values) {
    let formData = normalizeValues(values)
    return onSubmit(formData)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <div>
                  <Label>Name</Label>
                  <Input {...input} type="text" placeholder="Name" />
                  {(meta.error || meta.submitError) && meta.touched && (
                    <span>{meta.error || meta.submitError}</span>
                  )}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Field
              name="age"
              validate={composeValidators(required, mustBeNumber, minValue(0))}
            >
              {({ input, meta }) => (
                <div>
                  <Label>Age</Label>
                  <Input {...input} type="number" placeholder="Age" />
                  {(meta.error || meta.submitError) && meta.touched && (
                    <span>{meta.error || meta.submitError}</span>
                  )}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Field name="gender" validate={required}>
              {({ input, meta }) => (
                <div>
                  <Label>Gender</Label>
                  <Input {...input} type="text" placeholder="Gender" />
                  {(meta.error || meta.submitError) && meta.touched && (
                    <span>{meta.error || meta.submitError}</span>
                  )}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Field name="items" validate={required}>
              {({ input, meta }) => (
                <div>
                  <ItemsInput onChange={input.onChange} value={input.value} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <Button disabled={pristine || invalid}>Submit</Button>
        </form>
      )}
    />
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
