import app from "@route"

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
{
    console.log(`Server started at: ${PORT} port.`)
})

export default app