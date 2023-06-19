import { Router } from "express";

const policy = Router()

policy.get("/terms", (req, res) => {
    res.render("terms_and_conditions")
})
policy.get("/privacy", (req, res) => {
    res.render("privacy_policy")
})

export default policy