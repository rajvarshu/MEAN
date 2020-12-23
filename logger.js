const logger = (req,res,next) => {
    // console.log('In logging >>', req);
    next();
}
module.exports = logger;