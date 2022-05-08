const mongoose = require("mongoose");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestBody) {
   return Object.keys(requestBody).length > 0 ;
};

const isValidLogoLink=function (logoLink) {
   let validUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
   return validUrl.test(logoLink)
}

const isValidEmail=function(email){
    let mailFormat=/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    return mailFormat.test(email);
}

const isValidPhone=function (mobile) {
   let mobileFormat=/^\d{10}$/
   return mobileFormat.test(mobile)
}
module.exports = { isValid,isValidRequestBody,isValidEmail,isValidPhone,isValidLogoLink}
