const authorization = (perRoles) => {
    return (req, res, next) => {
      let isAllowed = false;
      perRoles.map(role => {
        if (req.body.userRole.includes(role)) {
          isAllowed = true;
        }
      });
      if (isAllowed) {
        return next();
      } else {
        return res.status(401).send({"Message": 'You are not authorized to use this route.' });
      }
    };
  };
  
  module.exports = {authorization};