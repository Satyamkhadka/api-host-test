
const auth = (req, res, next) => {
    //check for auth header
    if (req.headers.authorization) {
        let data = req.headers.authorization;
        // format of auth header Basic xxxxxxxxxx, so using split
        data = data.split(" ");
        if (data[0] && data[0] === 'Basic' && data[1]) {
            data = data[1];
            //decode base64 encoding of http authorization header
            let text = Buffer.from(data, 'base64');
            text = text.toString('ascii');
            //auth check
            if (text === 'satyam:khadka') {
                next();
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Authentication Failed",
                });
            }

        } else {
            return res.status(400).json({
                success: false,
                message: "Authentication Failed",
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: "No Auth header present",
        });
    }
}



export default auth;