import React, { useContext } from "react"
import { Flex, Link } from "reakit"
import { Link as ReactRouterLink } from "react-router-dom"
import SurvivorsSelectContext from "common/SurvivorsSelectProvider"
import appTheme from "theme"
import ReportInfectionModal from "../ReportInfectionModal"
import ModalContent from "../ReportInfectionModal/ModalContent"

function Toolbar() {
  let { items, clearItems } = useContext(SurvivorsSelectContext)

  return (
    <Flex
      height="60px"
      padding="16px 0"
      alignItems="center"
      marginBottom={appTheme.spacing.normal}
    >
      <Link
        as={ReactRouterLink}
        to="/survivors/new"
        marginRight={appTheme.spacing.normal}
      >
        New survivor
      </Link>
      <ReportInfectionModal disabled={items.length !== 2}>
        {hide => (
          <ModalContent
            survivorsInfected={items}
            clear={clearItems}
            closeModal={hide}
          />
        )}
      </ReportInfectionModal>
    </Flex>
  )
}

export default Toolbar
