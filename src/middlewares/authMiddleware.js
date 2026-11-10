const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const [type, token] = (req.headers.authorization || "").split(" ");

  if (type != "Bearer" || !token) {
    return res.status(401).json({ error: "token manquant" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload:", req.user);
    next();
  } catch {

    res.status(401).json({ error: "token invalide ou expiré" });
  }
}

function authorize(...roles ) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: "accés interdit" });
    next();
  };
}

module.exports={authenticate,authorize}
