import React, { createContext, useState } from "react"

const SurvivorsSelectContext = createContext()

function toggleItemUpdater(item) {
  return items => {
    const hasItem = items.some(it => it.id === item.id)
    if (hasItem) {
      return items.filter(it => it.id !== item.id)
    }
    return [...items, item]
  }
}

function SurvivorsSelectProvider({ children }) {
  let [state, setState] = useState([])

  let toggleItem = item => setState(toggleItemUpdater(item))

  let clearItems = () => setState([])

  return (
    <SurvivorsSelectContext.Provider
      value={{
        items: state,
        toggleItem: toggleItem,
        clearItems: clearItems
      }}
    >
      {children}
    </SurvivorsSelectContext.Provider>
  )
}

export { SurvivorsSelectProvider }
export default SurvivorsSelectContext
