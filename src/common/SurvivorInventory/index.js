import React from "react"
import { Block, Table, Input } from "reakit"
import InventoryTable from "common/InventoryTable"
import AsyncHandler from "common/AsyncHandler"
import useFetch from "lib/useFetch"

function SurvivorInventory({ survivorId }) {
  const inventory = useFetch(
    `//zssn-backend-example.herokuapp.com/api/people/${survivorId}/properties.json`
  )

  return (
    <AsyncHandler fetcher={inventory}>
      {({ data }) => {
        if (!data.length) {
          return <InventoryTable disabled={true} />
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
                {data.map(({ item: { name, points } }) => (
                  <tr key={name}>
                    <th>{name}</th>
                    <td>
                      <Input defaultValue={points} disabled={true} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Block>
        )
      }}
    </AsyncHandler>
  )
}

export default SurvivorInventory
