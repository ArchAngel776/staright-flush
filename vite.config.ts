import { resolve } from "path"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"


// https://vitejs.dev/config/
export default defineConfig({
    root: "client",
    server: {
        origin: "http://localhost:3000",
        port: 3000,
        hmr: false
    },
    plugins: [
        react({
            babel: {
                parserOpts: {
                    plugins: ["decorators-legacy", "classProperties"]
                }
            }
        })
    ],
    resolve: {
        alias: {
            "~bootstrap": resolve(__dirname, "node_modules/bootstrap")
        }
    }
})