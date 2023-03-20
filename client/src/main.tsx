import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.sass"

const root = document.getElementById("root") as HTMLDivElement
ReactDOM.createRoot(root).render(<StrictMode><App /></StrictMode>)