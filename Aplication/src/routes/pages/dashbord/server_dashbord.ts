import {NextFunction, Router, Response, Request} from "express"
import { client } from "../../../handler/runner"
import { chacke_aggred_terms, is_discord_login } from "../../../middlewares/auth"
import { DB_ServersTable, EnumLoginPath } from "../../../types"
import { ServersTable } from "../../../tables"
import { UploadedFile } from "express-fileupload"
import path from "path"
const server_dashbord = Router()

server_dashbord.use(chacke_aggred_terms)
server_dashbord.use(is_discord_login)

server_dashbord.get("/", (req, res) => {
    res.render("server_dashbord")
})



export default server_dashbord