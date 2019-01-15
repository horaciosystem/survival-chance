import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import SurvivorsList from "./pages/SurvivorsList"

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/survivals" exact component={SurvivorsList} />
        </>
      </Router>
    )
  }
}

export default App
