function getCookie(cookieName){
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim().split('=');
        if(cookie[0] === cookieName){
            return decodeURIComponent(cookie[1])
        } 
    }
    return null;
}

async function isAuthenticated(){
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if(accessToken && refreshToken){
        return true
    }else{
        redirectToLogin()
        return false
    }
}

async function issAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
        const expiraionTime = localStorage.getItem('expires')
        if(expiraionTime && Date.now() > parseInt(expiraionTime, 10)){
            const newToken = await response.headers.get('Authorization')
            if(newToken){
                setToken(newToken, calcExpTime())
                return true
            }else{
                clearToken();
                redirectToLogin();
                return false;
            }
        }
        return true;
    }
    redirectToLogin();
    return false;
}

function redirectToLogin(){
    window.location.href = '../pages/login.html'
};


function clearToken(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('expires')
}

function calcExpTime(){
    const expiraionTime = Date.now() + 24 *60 * 60 * 1000;
    return expiraionTime;
}

document.addEventListener("DOMContentLoaded", isAuthenticated())
// document.addEventListener('DOMContentLoaded');
