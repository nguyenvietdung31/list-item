// getting the values of local storage

export const getDatafromLS = () => {
    const data = localStorage.getItem('users')
    if (data) {
        return JSON.parse(data) // change jsonString to object
    }
    else {
        return []
    }
}