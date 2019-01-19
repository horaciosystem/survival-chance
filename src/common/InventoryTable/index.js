import React from "react"
import { Block, Table, Input } from "reakit"

const Items = ["Water", "Food", "Medication", "Ammunition"]

function InventoryTable({ onChange, value, disabled }) {
  function persistValue(event) {
    let { name, value: fieldValue } = event.target

    onChange({
      ...value,
      [name]: fieldValue
    })
  }

  return (
    <Block>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Items.map(it => (
            <tr key={it}>
              <th>{it}</th>
              <td>
                <Input
                  name={it}
                  type="number"
                  onChange={persistValue}
                  min="0"
                  defaultValue={0}
                  disabled={disabled}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Block>
  )
}

export default InventoryTable
