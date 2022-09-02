import React from "react"
import ReactDOM from "react-dom"
import { RenderData } from "streamlit-component-lib";
import { useRenderData, StreamlitProvider } from "streamlit-component-lib-react-hooks"
import DraggableList from "./DraggableList"

const DraggableListComponent: React.VFC = () => {
  const renderData: RenderData = useRenderData();
  return (
    <DraggableList {...{ ...renderData.args, "theme": renderData.theme }} />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <StreamlitProvider>
      <DraggableListComponent />
    </StreamlitProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
