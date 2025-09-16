const genAPIKey = () => {
    //create a base-36 string that contains 30 chars in a-z,0-9
    return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};

const users = [
    {
        _id: 1587912,
        api_key: "rwuy6434tgdgjhtiojiosi838tjue3",
        username: "username",
        // usage: [{ date: "2022-10-10", count: 17 }],
    },
];
module.exports = { users };

