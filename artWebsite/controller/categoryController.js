
const categoryModel = require("../model/categoryModel")
const upload = require("../middleware/uploadImage")
const categoryController = function(app) {

    app.post("/category", upload.single("image"), async (req, res) => {
        try {
            console.log("hello world")
            const {name, description} = req.body;
            const imageUrl = `uploads/${req.file.filename}`;
            const category = new categoryModel({name: name, description: description, imageUrl: imageUrl});
            await category.save()
            res.status(201).json(category)
        }catch(error) {
            console.log("eror occured " + error)
        }
    });

    app.get("/category", async (req, res) => {
        const categoryData = await categoryModel.find();
        res.render("category", {categoryData});

    });
};
module.exports = categoryController;

