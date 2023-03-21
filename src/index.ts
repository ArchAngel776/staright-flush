import Env from "@env"
import app from "@route"


const PORT = Env.PORT || 3000

app.listen(PORT, () =>
{
    console.log(`Server started at: ${PORT} port.`)
})

export default app