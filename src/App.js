import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider as ThemeProvider } from "reakit"
import theme from "reakit-theme-default"
import { StoreProvider } from "./common/StoreContext"
import SurvivorsList from "./pages/SurvivorsList"
import SurvivorDetails from "./pages/SurvivorDetails"

class App extends Component {
  render() {
    return (
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <>
              <Route path="/survivors" exact component={SurvivorsList} />
              <Route path="/survivor/:id/details" component={SurvivorDetails} />
            </>
          </Router>
        </ThemeProvider>
      </StoreProvider>
    )
  }
}

export default App
