const baseUrl = "/api/v1/user/dashboard";

async function dashboard(){
    let walletBalI = document.getElementById("accBalance");
    let currentInvestI = document.getElementById("currentInvest");
    let totalWithI = document.getElementById("totalWith");
    let totalDepoI = document.getElementById("totDeposit")
    let totalInvestI = document.getElementById("totInvest");


    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        const refreshToken = getCookie("refreshToken")
        
        try {
            
            const response = await fetch(baseUrl, {
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'AccessToken': accessToken,
                    'Refresh_Token': refreshToken,
                },
                credentials: 'include',
            });
            

            const data = await response.json();
            
            if(response.status === 404){
                
                redirectToLogin()
            }
            if(!response.ok){
                const resp = await response.json();
                if(resp.msg === "No user with such id"){
                    
                    redirectToLogin()
                }
                if(resp.statusCode === 404){
                    
                    redirectToLogin()
                }
                
            }
            
            const {
                walletBalance,
                totalInvestment,
                totalWithdrawal,
                totalDeposit,
                currentInvestment
            } = data.data;
 
            walletBalI.textContent = walletBalance,
            totalDepoI.textContent = totalDeposit,
            totalInvestI.textContent = totalInvestment,
            totalWithI.textContent = totalWithdrawal,
            currentInvestI.textContent = currentInvestment
            
            

        } catch (error) {
            console.log(error)
            return error;
        }
    }else{
        redirectToLogin();
    }


}

window.onload = dashboard;