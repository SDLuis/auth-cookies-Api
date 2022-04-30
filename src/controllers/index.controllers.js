const resIndex = (req, res) => {
    res.send("Api Working!")
};

const resProtected = (req, res) => {
    res.send("U re loged")
}
module.exports = {
    resIndex,
    resProtected,
};