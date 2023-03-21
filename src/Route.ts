import action from "@hooks/action"
import validate from "@hooks/validate"
import middleware from "@core/hooks/middleware"

import SiteAction from "@actions/SiteAction"
import RegisterAction from "@actions/RegisterAction"

import RegisterRequest from "@requests/RegisterRequest"

import CsrfValidation from "@middlewares/CsrfValidation"

import app from "@app"


app.get("/login", action(SiteAction))

//app.post("/login", action(LoginAction))

app.get("/register", action(SiteAction))

app.post("/register", middleware(CsrfValidation), validate(RegisterRequest), action(RegisterAction))

export default app