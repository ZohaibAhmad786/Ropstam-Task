import AsyncStorage from "@react-native-async-storage/async-storage"



//this fucntion will reutrn the value from async storage when every you need
export const getDataFromAsyncStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@token')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        throw new Error(e)
    }
}


// this fucntion will reutrn the error if your response status code is no equal to 200
export const returnError = (error) => {
    console.log(error);
    if (error?.response?.request) {
        let { _response } = error?.response?.request;
        console.log("FACTORY ERRORS :: ", JSON.parse(_response));
        return JSON.parse(_response) === "Insufficient balance in wallet."
            ? JSON.parse(_response)
            : JSON.parse(_response)?.error === "invalid_grant"
                ? JSON.parse(_response)?.message
                : // : Object.keys(JSON.parse(_response)?.errors).length > 0
                // ? DIET_CONSTANT.returnErrorList(JSON.parse(_response))
                JSON.parse(_response)?.message &&
                    JSON.parse(_response)?.errors === undefined //Object.keys(JSON.parse(_response)?.errors).length <= 0 && Object.keys(JSON.parse(_response)?.errors) === undefined
                    ? JSON.parse(_response)?.message
                    : JSON.parse(_response)?.message &&
                        JSON.parse(_response)?.errors.length <= 0
                        ? JSON.parse(_response)?.message //"Oops! it seems your signin session expired."
                        : DIET_CONSTANT.returnErrorList(JSON.parse(_response));
    } else {
        if (error?.message) {
            if (error?.message === "Network Error") {
                return "Network Error";
            } else {
                if (error === "Hi Dude") {
                    return "Dismiss";
                } else if (error?.message) {
                    if (error?.message === "Network Error") {
                        return "Network Error";
                    } else {
                        return error.message?.toString();
                    }
                } else {
                    return error?.toString();
                }
            }
        }
    }
}

const getOkMessage = () => ({ message: `OK`, status: true });

const getEmptyFieldMessage = (fieldName) => ({
    message: `Oops! you have forgot to enter ${fieldName}`,
    status: false,
});

const validateEmail = (mail) => {
    //const re = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
};
const getPasswordMessageSignin = (fieldName) => ({
    message: `Oops! It seems your password is less than 8 characters`,
    status: false,
});
export const signinValidation = (fields = {}) => {
    if (!fields?.email?.trim()) {
        return getEmptyFieldMessage("email");
    } else if (!validateEmail(fields?.email?.trim())) {
        return getInvalidFieldMessage("email");
    } else if (!fields?.password?.trim()) {
        return getEmptyFieldMessage("password");
    } else if (fields?.password?.trim()?.length < 8) {
        return getPasswordMessageSignin("password");
    }
    return getOkMessage();
};