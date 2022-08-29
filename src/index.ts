import express from "express"

const PORT = process.env.PORT || 3000
const server = express()

server.get("/", (request, response) => 
{
    response.setHeader("content-type", "text/html;charset=utf-8")
    response.send("<h1>Foo</h1>")
})

server.listen(PORT, () => 
{
    console.log(`Server started at: ${PORT} port.`)
})

export default server