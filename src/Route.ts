import action from "@hooks/action"
import validate from "@hooks/validate"

import RegisterAction from "@actions/RegisterAction"

import RegisterRequest from "@requests/RegisterRequest"

import app from "@app"


//app.post("/login", action(LoginAction))

app.post("/register", validate(RegisterRequest), action(RegisterAction))

export default app