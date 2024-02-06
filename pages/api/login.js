import cookie from "cookie";

export default async function handler(req, res) {
    if ("POST" === req.method){
        const {benutzer, passwort} = req.body;
        if (benutzer === process.env.ADMIN_USER && passwort === process.env.ADMIN_PW) {
            res.setHeader("Set-Cookie",cookie.serialize("token", process.env.TOKEN, {
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/"
            }))
            res.status(200).json({successfull : true})
        } else {
            res.status(400).json({successfull : false, message : "user not allowed"})
        }
    } else {
        res.status(500).json({successfull : false, message : "method not allowed"})
    }
}
