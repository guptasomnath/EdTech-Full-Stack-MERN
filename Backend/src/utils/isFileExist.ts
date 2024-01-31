import fs from "fs";

export const isFileExist = (filePath : string) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if(err){
                resolve(false);
            }else{
                resolve(true);
            }
        })
    })
}