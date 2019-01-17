import React from "react"
import { Heading } from "reakit"
import { FORM_ERROR } from "final-form"
import useFetch from "lib/useFetch"
import AsyncHandler from "common/AsyncHandler"
import MainColumn from "common/MainColumn"
import SurvivorForm from "common/SurvivorForm"

function SurvivorEdit({ match: { params } }) {
  const survivor = useFetch(
    `//zssn-backend-example.herokuapp.com/api/people/${params.id}.json`
  )

  function onSubmit(body) {
    return fetch(
      `//zssn-backend-example.herokuapp.com/api/people/${params.id}.json`,
      {
        method: "PATH",
        body
      }
    )
      .then(response => {
        if (response.status === 201) {
          return undefined
        }

        return response.json()
      })
      .catch(() => {
        return { [FORM_ERROR]: "Creation failed!" }
      })
  }

  return (
    <MainColumn>
      <Heading>New</Heading>
      <AsyncHandler fetcher={survivor}>
        {({ data }) => (
          <SurvivorForm onSubmit={onSubmit} initialValues={{ ...data }} />
        )}
      </AsyncHandler>
    </MainColumn>
  )
}

export default SurvivorEdit
