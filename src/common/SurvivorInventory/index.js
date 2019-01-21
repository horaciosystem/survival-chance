import React from "react"
import { Block, Table, Input } from "reakit"
import InventoryTable from "common/InventoryTable"
import AsyncHandler from "common/AsyncHandler"
import useFetch from "lib/useFetch"

const STORE_KEY = "INVENTORY"

const stateUpdater = data => prevState => {
  return { ...prevState, [STORE_KEY]: data }
}

function SurvivorInventory({ survivorId }) {
  const inventory = useFetch({
    key: STORE_KEY,
    url: `//zssn-backend-example.herokuapp.com/api/people/${survivorId}/properties.json`,
    stateUpdater
  })

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
                {data.map(({ item: { name }, quantity }) => (
                  <tr key={name}>
                    <th>{name}</th>
                    <td>
                      <Input defaultValue={quantity} disabled={true} />
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
