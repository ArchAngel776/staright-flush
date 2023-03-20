import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost",
                rewrite: path => path.replace(/^\/api/, "")
            }
        }
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