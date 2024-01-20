export const filterObjectFields = (object, fields) => {
    return Object
        .keys(object)
        .filter(key => fields.find(field => key.includes(field)))
        .reduce((acc, key) => {
            acc[key] = object[key]
            return acc
        },{})
}
