import multer from 'multer'



const storageSettings = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./public/uploads')
  },
  filename:(req,file,cb)=>{
    cb(null, Date.now() +'-'+file.originalname)
  }
});


export const instance = multer({storage:storageSettings})


