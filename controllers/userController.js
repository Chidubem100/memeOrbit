const {findUserById, changeEmail, changePassword} = require('../service/userService');

/**
 * Controller for changing password
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */

const handleChangeEmail = async (req, res) => {
  const { newEmail } = req.body;
  const userId = req.user.id; // Assume user is authenticated and ID is in req.user

  try {
    if(!newEmail){
        return res.status(404).json({error: "Provide the needed value(s)"})
    }
    const message = await changeEmail(userId, newEmail);

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};


// update password

const handleChangePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; // Assume user is authenticated and ID is in req.user

  try {
    if(!currentPassword || !newPassword){
        return res.status(404).json({error: "Provide the needed value(s)"})
    }
    const message = await changePassword(userId, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { handleChangePassword, handleChangeEmail };
