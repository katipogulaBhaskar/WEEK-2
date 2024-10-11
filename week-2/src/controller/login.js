const logInAdmin = async (req,res) => {
    try {
        const { adminname, password } = req.body;

        res.status(200).json({ success : true, message : "Login Successful !"});

    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500),json({ success : false, error: 'Internal Server Error'});
    }
}

module.exports = {logInAdmin}