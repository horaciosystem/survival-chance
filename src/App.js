import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider as ThemeProvider } from "reakit"
import { StoreProvider } from "common/StoreContext"
import SurvivorsList from "pages/SurvivorsList"
import SurvivorEdit from "pages/SurvivorEdit"
import SurvivorNew from "pages/SurvivorNew"
import theme from "theme"
import "theme/global"

class App extends Component {
  render() {
    return (
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <>
              <Route path="/survivors" exact component={SurvivorsList} />
              <Route path="/survivors/new" component={SurvivorNew} />
              <Route path="/survivors/:id/edit" component={SurvivorEdit} />
            </>
          </Router>
        </ThemeProvider>
      </StoreProvider>
    )
  }
}

export default App
