const User = require("../models/User");

async function createUser(email, gender, hashedPassword) {
    // TODO ADAPT USER FUNCTIONS TO PROJECT
    const user = new User({
        email,
        gender,
        hashedPassword,
    });

    await user.save();

    return user;
}


async function getUserbyEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await User.findOne({
        email: { $regex: pattern },
    });
    return user;
}

module.exports = {
    createUser,
    getUserbyEmail,
};
