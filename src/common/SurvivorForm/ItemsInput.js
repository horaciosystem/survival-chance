import React from "react"
import { Field } from "react-final-form"
import { Box } from "reakit"
import InventoryTable from "common/InventoryTable"
import SurvivorInventory from "common/SurvivorInventory"
import { required } from "utils/forms"
import ErrorLabel from "./ErrorLabel"

function ItemsInput({ survivorId }) {
  return survivorId ? (
    <Box marginBottom={16}>
      <SurvivorInventory survivorId={survivorId} />
    </Box>
  ) : (
    <Field name="items" validate={required}>
      {({ input, meta }) => (
        <Box marginBottom={16}>
          <InventoryTable
            onChange={input.onChange}
            value={input.value}
            disabled={false}
          />
          {meta.error && meta.touched && <ErrorLabel>{meta.error}</ErrorLabel>}
        </Box>
      )}
    </Field>
  )
}

export default ItemsInput
