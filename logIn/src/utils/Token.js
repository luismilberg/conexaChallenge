class Token {
    
    static getHeaderWithToken(token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    static getTokenFromRequest(req) {
        const authHeader = req.get('Authorization');
        const token = authHeader.split(' ')[1];
        return token;
    }
}

module.exports = Token;
