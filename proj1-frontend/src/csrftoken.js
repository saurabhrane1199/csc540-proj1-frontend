import Cookies from 'js-cookie';

function getCookie(name) {
    return Cookies.get('csrftoken')
}

export const csrftoken = getCookie('csrftoken');