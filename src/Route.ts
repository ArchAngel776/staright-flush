import server from "./index"

server.get("/", (request, response) => 
{
    response.setHeader("content-type", "text/html;charset=utf-8")
    response.send("<h1>Foo</h1>")
})