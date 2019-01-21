import React from "react"
import { Heading } from "reakit"
import { FORM_ERROR } from "final-form"
import AsyncHandler from "common/AsyncHandler"
import MainColumn from "common/MainColumn"
import SurvivorForm from "common/SurvivorForm"
import useFetch from "lib/useFetch"
import { success } from "lib/notifications"

function SurvivorEdit({ match: { params } }) {
  const survivor = useFetch(
    `//zssn-backend-example.herokuapp.com/api/people/${params.id}.json`
  )

  function onSubmit(body) {
    return fetch(
      `//zssn-backend-example.herokuapp.com/api/people/${params.id}.json`,
      {
        method: "PATCH",
        body
      }
    )
      .then(response => {
        if (response.status === 200) {
          success("Survivor updated")
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
      <Heading>Edit</Heading>
      <Heading fontSize={24}>ID {params.id}</Heading>
      <AsyncHandler fetcher={survivor}>
        {({ data }) => (
          <SurvivorForm
            onSubmit={onSubmit}
            initialValues={{ ...data }}
            survivorId={params.id}
          />
        )}
      </AsyncHandler>
    </MainColumn>
  )
}

export default SurvivorEdit
