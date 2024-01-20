export const filterObjectsArray = (array, filterFunc, fields) => {
    return array.map(data => {
        return filterFunc(data, fields)
    })
}