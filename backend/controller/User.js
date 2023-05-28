const express = require('express');
const path = require('path');
const router = express.Router();
const { upload } = require('../multer');
const fs = require('fs')
const User = require('../model/User');
const ErrorHandler = require("../utils/ErrorHandler");
const bcryptjs = require('bcryptjs');




router.post("/register-user", upload.single('file'), async (req, res) => {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const newUser = await User.create(user);
    res.status(201).json({
      success: true,
      message: "Usuario creado correctamente",
      newUser,
    });
}
);

module.exports = router;