const transformSampleNameFormat = (originalString) => {
    const sampleRegex = /\b(\d+[\/а-яА-Я\d]+|\d+\/\d+\-\w)\b/i
    const separatedString = originalString.split(' ')
    const formattedSampleName = separatedString.find(string => {
        return sampleRegex.test(string) === true
    })
    return formattedSampleName ? formattedSampleName : 'Неверный формат данных'
}

const transformSampleDate = (date) => {
    const [datePart, timePart] = date.split(' ');
    const [day, month, year] = datePart.split('.');
    const [hours, minutes] = timePart.split(':');
    return new Date(year, month - 1, day, hours, minutes);
}

export const filterObjectFields = (object, fields) => {
    return Object
        .keys(object)
        .filter(key => fields.find(field => key.includes(field)))
        .reduce((acc, key) => {
            if (key === 'Наименование' || key === 'наименование') {
                acc[key] = transformSampleNameFormat(object[key])
                return acc
            }
            if (key === 'Дата') {
                acc[key] = transformSampleDate(object[key])
                return acc
            }
            acc[key] = object[key]
            return acc
        },{})
}
