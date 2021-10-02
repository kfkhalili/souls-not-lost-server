const AWS = require('aws-sdk');
const myBucket = process.env.BUCKET_NAME;
const awsKey = process.env.AWS_IAM_KEY;
const awsSecret = process.env.AWS_IAM_SECRET;

const s3 = new AWS.S3({
    region: 'eu-west-1',
    accessKeyId: awsKey,
    secretAccessKey: awsSecret,
    endpoint: 'https://s3.eu-west-1.amazonaws.com'
});

const createMainBucket = () => {
    return new Promise((resolve, reject) => {
        const bucketParams = {
            Bucket: myBucket
        }
        s3.headBucket(bucketParams, (err, data) => {
            if (err) {
                s3.createBucket(bucketParams, (err2, created) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(created)
                    }
                })
            } else {
                resolve(data)
            }
        })
    })
}

const createItemObject = params => {
    return new Promise((resolve, reject) => {
        s3.putObject(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const uploadImage = async (image, name) => {
    try {
        await createMainBucket();
        const params = {
            Bucket: myBucket,
            Key: `${name}`,
            ACL: 'public-read',
            Body: image
        }

        await createItemObject(params)
        return `https://s3.eu-west-1.amazonaws.com/${myBucket}/${name}`;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
const uploadImageByFormaidable = async (image, name) => {
    try {
        await createMainBucket();
        const params = {
            Bucket: myBucket,
            Key: `${name}`,
            ACL: 'public-read',
            Body: image
        }

        await createItemObject(params)
        return `https://s3.eu-west-1.amazonaws.com/${myBucket}/${name}`;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = { uploadImage, uploadImageByFormaidable }