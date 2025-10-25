// This file extracts a meaningful error message from Mongoose/MongoDB error objects.

const getErrorMessage = (err) => {
    let message = ''

    if (err.code) {
        // MongoDB duplicate key error (code 11000 or 11001)
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Email already exists. Please use a unique email address.'
                break
            default:
                message = 'Something went wrong with the database operation.'
        }
    } else {
        // Mongoose validation errors (e.g., missing 'required' field)
        for (let errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message
        }
    }
    return message
}

export default { getErrorMessage }
