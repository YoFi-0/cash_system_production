import {Router} from "express"
import { chacke_aggred_terms, is_discord_login } from "../../../middlewares/auth"
const search_dashbord = Router()

search_dashbord.use(chacke_aggred_terms)
search_dashbord.use(is_discord_login)

search_dashbord.get("/", (req, res) => {
    res.render("search_dashbord")
})

export default search_dashbord