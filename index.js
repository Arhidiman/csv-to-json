import {getParsedData} from "./lib/getParsedData.js";
import {filterObjectFields} from "./lib/filterObjectFields.js";
import {filterObjectsArray} from "./lib/filterObjectsArray.js";
import {writeOjbToJSON} from "./lib/writeOjbToJSON.js";

const inputFilePath = 'data.csv'
const outputFilePath = 'output.json'
const firstSectionFields = ['Оператор', 'Дата']
const secondSectionFields = ['Наименование', 'Дата', 'Конц']

const getRequiredStructure = async () => {
    const {firstSectionData, secondSectionData} = await getParsedData(inputFilePath)
    const firstSection = filterObjectFields(firstSectionData, firstSectionFields)
    const secondSection = filterObjectsArray(secondSectionData, filterObjectFields, secondSectionFields)
    return {
        commonData: firstSection,
        samples: secondSection
    }
}


getRequiredStructure()
    .then(data => writeOjbToJSON(data, outputFilePath))
