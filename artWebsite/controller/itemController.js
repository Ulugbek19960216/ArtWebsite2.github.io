const itemModel = require("../model/itemModel")
const uploadItems = require("../middleware/uploadItemsImage")
const itemController = function(app) {

    app.post("/items/:categoryId", uploadItems.single("image"), async (req, res)=> {
        const categoryId = req.params.categoryId;
        const {name, price, description} = req.body;
        
        try {
            const categoryId = req.params.categoryId;
            const {name, price, description} = req.body;
            const imageUrl = `uploads/${req.file.filename}`;
            const item = new itemModel({
                name: name, 
                price: price, 
                description: description, 
                imageUrl: imageUrl,
                category: categoryId
            });

            await item.save()
            res.status(201).json(item)
        }catch(error) {
            console.log("eror occured " + error)
        }
    });

    app.get("/items/:categoryId", async (req, res)=> {
        try {
            const categoryId = req.params.categoryId;
            const itemsData = await itemModel.find({category: categoryId});
            
            res.render("galleryItems", {itemsData});
        }catch(error) {
            console.log(error)
            res.status(500).json({error: "interval server error"})
        }
       
    })
}

module.exports = itemController;