import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'



const uploadImage = async (localPath) => {

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
      });

    if(!localPath) return null
    try {
        const uploadResult = await cloudinary.uploader.upload(localPath, { resource_type: "auto" })
        fs.unlinkSync(localPath)
        return uploadResult
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localPath)
        throw new error
    }
}

export { uploadImage }
