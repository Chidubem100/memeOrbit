"/deposit/fund-wallet"
"/history"
'/deposit/deposit-history/:id' 

const baseUrl = "/api/v1/dposit/";

function clearErrors(){
    const errMsg = document.getElementById('errorMsg');
    errMsg.textContent = '';
}

function displayError(msg){
    const errMsg = document.getElementById("errorMsg");
    errMsg.innerHTML += `<p class="text-center lead mb-4" >${msg}</p>`
    setTimeout(clearErrors,5000)
}    
function displaysuccess(msg){
    const errMsg = document.getElementById("successMsg");
    errMsg.innerHTML += `<p class="text-center lead mb-4" >${msg}</p>`
    setTimeout(clearErrors, 5000)
    
}

async function btcDeposit(){

    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        const refreshToken = getCookie("refreshToken")
        
        try {
            const storedMethod = localStorage.getItem("paymentMethod");
            const amt = localStorage.getItem("depositAmt");

            const method = storedMethod === "Bitcoin" ? 'btc' : storedMethod;

            if(!method){
                displayError("No Valid Method")
            
            }

            const data = {
                amount: Number(amt),
                method: method
            }


            const response = await fetch(baseUrl + "fund-wallet", {
                method: "POST",
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'AccessToken': accessToken,
                    'Refresh_Token': refreshToken,
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            
            if(!response.ok){
                displayError(`Error: ${response.status} - ${response.statusText}`)
            }
            
            const result = await response.json();
            localStorage.removeItem("paymentMethod")
            displaysuccess("Deposit is now being processed!!")
            window.location.href = "../dashboard/dashboard.html"
            return result;
            

        } catch (error) {
            console.log(error)
            return error;
        }
    }else{
        redirectToLogin();
    }
}

async function ethDeposit(){

    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        const refreshToken = getCookie("refreshToken")
        
        try {
            const storedMethod = localStorage.getItem("paymentMethod");
            const amt = localStorage.getItem("depositAmt");

            const method = storedMethod === "Ethereum" ? 'eth' : storedMethod;

            if(!method){
                displayError("No Valid Method")
            
            }

            const data = {
                amount: Number(amt),
                method: method
            }


            const response = await fetch(baseUrl + "fund-wallet", {
                method: "POST",
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'AccessToken': accessToken,
                    'Refresh_Token': refreshToken,
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            
            if(!response.ok){
                displayError(`Error: ${response.status} - ${response.statusText}`)
            }
            
            const result = await response.json();
            localStorage.removeItem("paymentMethod")
            displaysuccess("Deposit is now being processed!!")
            window.location.href = "../dashboard/dashboard.html"
            return result;
            

        } catch (error) {
            console.log(error)
            return error;
        }
    }else{
        redirectToLogin();
    }
}

async function usdtDeposit(){

    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        const refreshToken = getCookie("refreshToken")
        
        try {
            const storedMethod = localStorage.getItem("paymentMethod");
            const amt = localStorage.getItem("depositAmt");

            const method = storedMethod === "Usdt" ? 'usdt' : storedMethod;

            if(!method){
                displayError("No Valid Method")
            
            }

            const data = {
                amount: Number(amt),
                method: method
            }


            const response = await fetch(baseUrl + "fund-wallet", {
                method: "POST",
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'AccessToken': accessToken,
                    'Refresh_Token': refreshToken,
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            
            if(!response.ok){
                displayError(`Error: ${response.status} - ${response.statusText}`)
            }
            
            const result = await response.json();
            localStorage.removeItem("paymentMethod")
            displaysuccess("Deposit is now being processed!!")
            window.location.href = "../dashboard/dashboard.html"
            return result;
            

        } catch (error) {
            console.log(error)
            return error;
        }
    }else{
        redirectToLogin();
    }
}

async function completedDepositsHistory(){

    const tablebody = document.querySelector("#depositHistory tbody")
    
    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        const refreshToken = getCookie("refreshToken")
        
        try {
            
            const response = await fetch(baseUrl + "history",{
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'AccessToken': accessToken,
                    'Refresh_Token': refreshToken,
                },
                credentials: 'include'    
            });
            // if(response.status === 404){
                
            //     redirectToLogin()
            // }
            // if(!response.ok){
            //     const resp = await response.json();
            //     if(resp.msg === "No user with such id"){
                    
            //         redirectToLogin()
            //     }
            //     if(resp.statusCode === 404){
                    
            //         redirectToLogin()
            //     }
                
            // }
            if(response.ok){
                const data = await response.json();
                const {
                    deposit
                } = data

                
                // console.log(data.deposit)
                if(data.msg === "No deposit found"){
                    const emptyRow = document.createElement('tr')
                    const emptyCell = document.createElement('td')
                    emptyCell.setAttribute('colspan', 2)
                    emptyCell.textContent = "No Data Found"
                    emptyRow.appendChild(emptyCell)
                    emptyCell.appendChild(emptyRow)
                }else{

                    deposit.forEach(data => {
                        const parsedDate = moment(data.date);
                        const formattedTime = parsedDate.format('DD/MM/YYYY')

                        const row = document.createElement("tr");
                        const display = ["date", "trxn_Id", "methhod", "amount", "usd", "status"]
                        display.forEach(column =>{
                            const cell = document.createElement("td");
                            // cell.textContent = column === 'date' ? formattedTime : data[column];
                            cell.textContent = column === 'date' ? formattedTime : column === 'status' ? (data[column] ? 'Approved' : 'Pending') : data[column];
                            row.appendChild(cell)
                        });
                        tablebody.appendChild(row)
                    });
                }    
            }
        } catch (error) {

            console.log(error)
            return;
            
        }
    }else{
        redirectToLogin();
        
    }
}


async function pendingDepositsHistory(){

    const tablebody = document.querySelector("#depositHistory tbody")
    
    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        const refreshToken = getCookie("refreshToken")
        
        try {
            
            const response = await fetch(baseUrl + "history",{
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'AccessToken': accessToken,
                    'Refresh_Token': refreshToken,
                },
                credentials: 'include'    
            });
            // if(response.status === 404){
                
            //     redirectToLogin()
            // }
            // if(!response.ok){
            //     const resp = await response.json();
            //     if(resp.msg === "No user with such id"){
                    
            //         redirectToLogin()
            //     }
            //     if(resp.statusCode === 404){
                    
            //         redirectToLogin()
            //     }
                
            // }
            if(response.ok){
                const data = await response.json();
                const {
                    deposit
                } = data

                
                // console.log(data.deposit)
                if(data.msg === "No deposit found"){
                    const emptyRow = document.createElement('tr')
                    const emptyCell = document.createElement('td')
                    emptyCell.setAttribute('colspan', 2)
                    emptyCell.textContent = "No Data Found"
                    emptyRow.appendChild(emptyCell)
                    emptyCell.appendChild(emptyRow)
                }else{

                    deposit.forEach(data => {
                        const parsedDate = moment(data.date);
                        const formattedTime = parsedDate.format('DD/MM/YYYY')

                        const row = document.createElement("tr");
                        const display = ["date", "trxn_Id", "methhod", "amount", "usd", "status"]
                        display.forEach(column =>{
                            const cell = document.createElement("td");
                            // cell.textContent = column === 'date' ? formattedTime : data[column];
                            cell.textContent = column === 'date' ? formattedTime : column === 'status' ? (data[column] ? 'Approved' : 'Pending') : data[column];
                            row.appendChild(cell)
                        });
                        tablebody.appendChild(row)
                    });
                }    
            }
        } catch (error) {

            console.log(error)
            return;
            
        }
    }else{
        redirectToLogin();
        
    }
}


async function depositHistory(){
    
    const tablebody = document.querySelector("#depositHistory tbody")
    
    if(await isAuthenticated()){
        const accessToken = getCookie("accessToken")
        const refreshToken = getCookie("refreshToken")
        
        try {
            
            const response = await fetch(baseUrl + "history",{
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                    'AccessToken': accessToken,
                    'Refresh_Token': refreshToken,
                },
                credentials: 'include'    
            });
            // if(response.status === 404){
                
            //     redirectToLogin()
            // }
            // if(!response.ok){
            //     const resp = await response.json();
            //     if(resp.msg === "No user with such id"){
                    
            //         redirectToLogin()
            //     }
            //     if(resp.statusCode === 404){
                    
            //         redirectToLogin()
            //     }
                
            // }
            if(response.ok){
                const data = await response.json();
                const {
                    deposit
                } = data

                
                // console.log(data.deposit)
                if(data.msg === "No deposit found"){
                    const emptyRow = document.createElement('tr')
                    const emptyCell = document.createElement('td')
                    emptyCell.setAttribute('colspan', 2)
                    emptyCell.textContent = "No Data Found"
                    emptyRow.appendChild(emptyCell)
                    emptyCell.appendChild(emptyRow)
                }else{

                    deposit.forEach(data => {
                        const parsedDate = moment(data.date);
                        const formattedTime = parsedDate.format('DD/MM/YYYY')

                        const row = document.createElement("tr");
                        const display = ["date", "trxn_Id", "methhod", "amount", "usd", "status"]
                        display.forEach(column =>{
                            const cell = document.createElement("td");
                            cell.textContent = column === 'date' ? formattedTime : data[column];
                            // cell.textContent = column === 'date' ? formattedTime : column === 'status' ? (data[column] ? 'Approved' : 'Pending') : data[column];
                            row.appendChild(cell)
                        });
                        tablebody.appendChild(row)
                    });
                }    
            }
        } catch (error) {

            console.log(error)
            return;
            
        }
    }else{
        redirectToLogin();
        
    }

}


window.onload = depositHistory;
window.onload = completedDepositsHistory;
window.onload = pendingDepositsHistory;


