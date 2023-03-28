import action from "@hooks/action"
import validate from "@hooks/validate"
import middleware from "@hooks/middleware"

import SiteAction from "@actions/SiteAction"
import LoginAction from "@actions/LoginAction"
import RegisterAction from "@actions/RegisterAction"
import LogoutAction from "@actions/LogoutAction"
import MeAction from "@actions/MeAction"
import AvatarAction from "@actions/AvatarAction"

import LoginRequest from "@requests/LoginRequest"
import RegisterRequest from "@requests/RegisterRequest"

import CsrfValidation from "@middlewares/CsrfValidation"
import Auth from "@middlewares/Auth"
import Guest from "@middlewares/Guest"

import app from "@app"


app.get("/", middleware(Auth, "/login"), action(SiteAction))

app.get("/login", middleware(Guest, "/"), action(SiteAction))

app.post("/login", middleware(Guest), middleware(CsrfValidation), validate(LoginRequest), action(LoginAction))

app.get("/register", middleware(Guest, "/"), action(SiteAction))

app.post("/register", middleware(Guest), middleware(CsrfValidation), validate(RegisterRequest), action(RegisterAction))

app.post("/logout", middleware(Auth), middleware(CsrfValidation), action(LogoutAction))

app.get("/me", middleware(Auth), action(MeAction))

app.get("/avatar/:avatar", action(AvatarAction))

app.get("/game", action(SiteAction))

export default app