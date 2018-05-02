const fs = require('fs');
const shortid = require('shortid');

const uploadDir = '../../uploads';

const storeFS = ({ stream, filename }) => {
  const id = shortid.generate()
  const path = `${uploadDir}/${id}-${filename}`
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  )
};


module.exports.processUpload = async (upload) => {
  console.log('upload', upload);
  console.log('stream',stream);
  console.log('filename',filename);
  console.log('mimetype',mimetype);
  console.log('encoding',encoding);

  if(!stream || !filename || !mimetype || !encoding) return false;
  console.log('SHOULD NOT BE EXECTUTED?', !!filename);
  const { id, path } = await storeFS({ stream, filename })
  return true;
  // const { id, path } = await storeFS({ stream, filename })
  // return storeDB({ id, filename, mimetype, encoding, path })
}
