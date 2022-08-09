const express = require('express');
const router = express.Router();
const { Blog } = require('../models/Blog');
const { auth } = require("../middleware/auth");
const multer = require('multer');

// < ------------- Board and Post ----------------> //

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only .jpg/.png allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {

  upload(req, res, err => {
      if (err) {
          return res.json({ success: false, err })
      }
      return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })

});

// router.get("/uploadfiles", (req, res) => {

//   Blog.find()
//       .populate('fileName')
//       .exec((err, blogs) => {
//           if(err) return res.status(400).send(err);
//           res.status(200).json({ success: true, blogs })
//       })

// });

router.post("/getBlogs", (req, res) => {

    Blog.find({ 'writer': req.body.writer })
        .exec((err, blogs) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, blogs })
        })
  
  });

router.post("/uploadBlog", (req, res) => {

  const blog = new Blog(req.body);

  blog.save((err, blog) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({
          success: true 
      })
  })

});

router.post("/getBlog", (req, res) => {

  Blog.findOne({ "_id" : req.body.blogId })
    .populate('writer')
    .exec((err, blog) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, blog })
    })
});

// router.post('/removeFromBoard', (req, res) => {

//     Blog.findOneAndDelete({ writer: req.body.writer, blogId: req.body._id })
//         .exec((err, result) => {
//             if (err) return res.status(400).send(err)
//             return res.status(200).json({ success: true })
//         })
  
//   })
  
router.post('/removeClickedBlog', (req, res) => {

    Blog.findOneAndDelete({ blogId: req.body._id, writer: req.body.writer })
        .exec((err, result) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true })
        })
  
})

module.exports = router;