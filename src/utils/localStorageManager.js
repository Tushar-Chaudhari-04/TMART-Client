
export const ACCESS_TOKEN="access_token";
export const REFRESH_TOKEN="refresh_token";
export const USER="user"
export const USER_FIRST_NAME="user_first_name"
export const USER_LAST_NAME="user_last_name"
export const PRODUCT_DATA="product_data"

export const getItem=(key)=>{
    return localStorage.getItem(key);
}

export const setItem=(key,value)=>{
    return localStorage.setItem(key,value);
}

export const removeItem=(key)=>{
    return localStorage.removeItem(key);
}