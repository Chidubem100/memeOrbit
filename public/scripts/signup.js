const baseUrl = "/api/v1/auth/";

function clearErrors(){
    const errMsg = document.getElementById('error-message');
    console.log(errMsg)
    errMsg.textContent = ''
}
function displayError(msg){
    const errMsg = document.getElementById("error-message");
    errMsg.innerHTML += `<p class="text-center lead mb-4" >${msg}</p>`
    setTimeout(clearErrors, 7000)
}
function setToken(val, expDur){
    localStorage.setItem('accessToken', val)
    localStorage.setItem('expires', expDur)
}

async function signupBtn(){
    const usernamei = document.getElementById("usernameInput");
    const emaili = document.getElementById("emailInput");
    const passwordi = document.getElementById("passwordInput");
    const confirmPasswordi = document.getElementById("confirmPasswordInput");
    const countryi = document.getElementById("countryInput");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formp = document.getElementById("form");
    const btn = document.getElementById("sbtn");
    // console.log(usernamei)
    let usernameVal = usernamei.value;
    let emailVal = emaili.value;
    let passwordVal = passwordi.value;
    let confirmPasswordVal = confirmPasswordi.value
    let countryVal = countryi.value
    clearErrors();
    console.log(usernameVal)
    // validate inputs
    if(!usernameVal || !emailVal || !passwordVal || !confirmPasswordVal || !countryVal){
        displayError('Please provide the needed value(s)')
        return;
    }

    if(!emailRegex.test(emailVal)){
        displayError('Email is not valid!')
        return;
    }

    if(passwordVal.length < 8){
        displayError('Password should be at least 8 characters')
        return;
    }

    if(passwordVal !== confirmPasswordVal){
        displayError("Password and confirm password does not match")
        return;
    }

    const data = {
        username: usernameVal,
        email: emailVal,
        password: passwordVal,
        confirmPassword: confirmPasswordVal,
        country: countryVal
    }
    console.log("sign up btn reacting" + data.username)

    btn.textContent = 'Please wait.....';
    btn.disabled = true;
    formp.disabled = true;

    try {
        const response = await fetch(baseUrl+'signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        if(!response.ok){
            const resp = await response.json(); 
            console.log(resp.message)
            displayError(resp.msg ||'Something went wrong');
            
            btn.textContent = 'Sign up';
            btn.disabled = false;
            formp.disabled = false;
            return;
        }
    
        if(response.ok){
            const resp = await response.json();

            const accessToken = resp.accessToken;
            const refreshToken = resp.refreshToken;

            const expiraionTime = new Date();
            expiraionTime.setTime(expiraionTime.getTime() + (1 * 24 *60 * 60))

            
            document.cookie = `accessToken=${accessToken}; expires=${expiraionTime.toUTCString()}; path=/; `;
            document.cookie = `refreshToken=${refreshToken}; expires=${expiraionTime.toUTCString()}; path=/; `;
            
            // success modal
            window.location.href = "../dashboard/dashboard.html"
            
            usernameVal = '',
            emailVal = '',
            passwordVal = '',
            confirmPasswordVal = ''

            btn.textContent = 'Sign up';
            btn.disabled = false;
            formp.disabled = false;
           
            return  true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error)    
        btn.textContent = 'Sign up';
        btn.disabled = false;
        formp.disabled = false;
        displayError("Error occurred!!")
    }

}