import csv from "fast-csv";
import fs from 'fs'

export const getParsedData = async (filePath) => {
    let firstSection = true;
    let headerRow = [];
    let firstSectionData = {};
    let secondSectionData = [];
    return new Promise((resolve) => {
        fs.createReadStream(filePath)
            .pipe(csv.parse({ delimiter: ';' }))
            .on('data', (row) => {
                if (firstSection) {
                    // Обработка первого раздела
                    if (row.every(value => value === '')) {
                        firstSection = false; // Переход к второму разделу
                    } else {
                        firstSectionData[row[0]] = row[1];
                    }
                } else {
                    // Обработка второго раздела
                    if (!headerRow.length) {
                        headerRow = row;
                    } else {
                        const obj = {};
                        row.forEach((value, index) => {
                            obj[headerRow[index]] = value;
                        });
                        secondSectionData.push(obj);
                    }
                }
            })
            .on('end', () => {
                resolve({
                    firstSectionData,
                    secondSectionData
                })
            })
    })
}