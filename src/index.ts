import express from "express"

const PORT = process.env.PORT || 3000
const server = express()

server.listen(PORT, () => 
{
    console.log(`Server started at: ${PORT} port.`)
})

export default server