import {NextFunction, Router, Response, Request} from "express"
import { client } from "../../../handler/runner"
import { chacke_aggred_terms, is_discord_login } from "../../../middlewares/auth"
import { DB_ServersTable, EnumLoginPath } from "../../../types"
import { ServersTable } from "../../../tables"
import { UploadedFile } from "express-fileupload"
import path from "path"
const user_dashbord = Router()


user_dashbord.use(chacke_aggred_terms)
user_dashbord.use(is_discord_login)

user_dashbord.get("/", (req, res) => {
    res.render("user_dashbord")
})

export default user_dashbord