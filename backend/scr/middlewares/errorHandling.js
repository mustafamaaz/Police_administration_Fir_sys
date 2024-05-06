let express = require('express')

const handleAsyncErrors = (fn) => (req, res, next) => {
    // return res.status(500).json({ error: 'query is empty' ,success: false });
   
    Promise.resolve(fn(req, res, next)).catch(next);
    // return res.status(500).json({ error: 'query is empty' ,success: false });
};

module.exports = handleAsyncErrors;