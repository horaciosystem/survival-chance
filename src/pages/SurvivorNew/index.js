import React, { useState } from "react"
import { Heading } from "reakit"
import { Redirect } from "react-router"
import { FORM_ERROR } from "final-form"
import MainColumn from "../../common/MainColumn"
import SurvivorForm from "./SurvivorForm"

function SurvivorNew() {
  let [id, setId] = useState(null)

  function onSubmit(body) {
    return fetch("//zssn-backend-example.herokuapp.com/api/people.json", {
      method: "POST",
      body
    })
      .then(async response => {
        if (response.status === 201) {
          let survivor = await response.json()
          setId(survivor.id)
          return undefined
        }

        return response.json()
      })
      .catch(() => {
        return { [FORM_ERROR]: "Creation failed!" }
      })
  }

  if (id) {
    return <Redirect to={`/survivors/${id}/details`} />
  }

  return (
    <MainColumn>
      <Heading>New</Heading>
      <SurvivorForm onSubmit={onSubmit} />
    </MainColumn>
  )
}

export default SurvivorNew
