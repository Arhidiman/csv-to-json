import fs from 'fs'
export const writeOjbToJSON = (obj, filePath) => {
    const jsonOjb = JSON.stringify(obj, null, 2)
    fs.writeFileSync(filePath, jsonOjb);
}