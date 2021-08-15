const ftp = require("basic-ftp")

async function uploadFile() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "<www.ftphost.com>",
            post: 22,
            user: "<username>",
            password: "<password>",
            secure: true,
        })
        console.log(await client.list())
        //await client.uploadFrom("README.md", "README_FTP.md")
        //await client.downloadTo("error_log", "error_log")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
  }