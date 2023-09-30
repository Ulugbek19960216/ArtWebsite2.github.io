const path = require("path")
const multer = require("multer")

//! Use of Multer
var storage = multer.diskStorage({
    destination: 'public/items/uploads',
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname  + formatTimeStamp(Date.now()) + "_" + file.originalname)
    }
})
 
var upload = multer({
    storage: storage
});

function formatTimeStamp(timestamp) {
    var date = new Date(timestamp);
        return date.getFullYear() + 
          "_"+(date.getMonth()+1)+
          "_"+date.getDate()+
          "_"+date.getHours()+
          "_"+date.getMinutes()+
          "_"+date.getSeconds()
}

module.exports = upload;