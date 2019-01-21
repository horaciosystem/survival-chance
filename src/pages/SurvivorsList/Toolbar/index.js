import React, { useContext } from "react"
import { Flex, Box, Link } from "reakit"
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
      <Box marginRight={appTheme.spacing.normal}>
        <Link as={ReactRouterLink} to="/survivors/new">
          New survivor
        </Link>
      </Box>
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
