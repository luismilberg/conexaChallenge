const jwt = require('jsonwebtoken');
const statusCode = require('http-status');

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');
    
    if(!authHeader){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        return res.status(error.statusCode).json({error: error.message});
    }

    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        console.log(error);
        error.statusCode = 500;
        return res.status(error.statusCode).json({error: error.message});
    }

    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        return res.status(error.statusCode).json({error: error.message});
    }

    next();

}