
export const validate = (name, value, formdata) => {

    switch (name) {
        case "firstname":
            if (value.length < 3) {
                return "name must be at least 3 characters long"
            }
            return ""
        case "lastname":
            if (value.length < 3) {
                return "name must be at least 3 characters long"
            }
            return ""

        case "email":
            if (value.length < 3) {
                return "Email should be in correct format"
            }
            return ""

        case "password":
            if (value.length < 8) {
                return "Password must be at least 8 characters long"
            }
            return ""
            case "confirmpassword":
            if (value !== formdata.password) {
                return "Password must match"
            }
            return ""
        case "country":
            if (value.length <= 0) {
                return "name must be at least 3 characters long"
            }
            return ""
        default:
            return "";
    }
}