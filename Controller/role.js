async function login(req, res) {
    try {
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something went wrong!" });
    }
}

module.exports = { login };