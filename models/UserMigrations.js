const { User } = require("./User");
const bcrypt = require('bcrypt');

// Update all existing records to set 'manager' to false
User.updateMany({}, { $set: { manager: false } })
    .then(() => {
        console.log('Records updated successfully.');
    })
    .catch((err) => {
        console.error('Error updating records:', err);
    });

// hash all the existing passwords
async function hashPasswords() {
    try {
        // Retrieve all users
        const users = await User.find({});

        // Iterate over each user
        for (const user of users) {
            const password = user.password;

            // Generate bcrypt hash
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Update the user's password with the hashed version
            user.password = hashedPassword;
            await user.save();
        }

        console.log('Passwords hashed successfully');
    } catch (error) {
        console.error('Error hashing passwords:', error);
    }
}
module.exports.hashPasswords = hashPasswords;