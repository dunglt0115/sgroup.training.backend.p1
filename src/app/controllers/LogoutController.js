const SessionModel = require('../models/Sessions');

class LogoutController {
    // [DELETE] /logout
    async delete(req, res) {
        const sessionId = req.signedCookies.user;
        
        if (sessionId) {
            await SessionModel.deleteOne({_id: sessionId});
            await res.clearCookie("user");
            return res.status(203).json({});
        }
        
        return res.status(200).json({
            message: 'Can not logout'
        });
    }
}

module.exports = new LogoutController;
