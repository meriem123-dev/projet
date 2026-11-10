const forme_email =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegister({name,email,password})
{
    if(!email || !password || !name)  return "champs manquants";
    if((typeof(name)!== "string") || (name.length)<2) return "champs name invalide";
    if((typeof(email)!== "string")||(!forme_email.test(email))) return "format de l'email invalide";
    if((typeof(password)!== "string")||password.length<6) return "le mot de passe doit comporter au moins 6 caractères";

    return null;
}

function validateLogin({email,password})
{
    
    if(!email || !password)  return "champs manquants";
    if((typeof(email)!== "string")||(!forme_email.test(email))) return "format de l'email invalide";
    if((typeof(password)!== "string")||(password.length<6)) return "le mot de passe de comporter au moins 6 caractères";

    return null;

}

module.exports = {validateLogin,validateRegister};