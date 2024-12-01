let price = 19.5;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
document.getElementById("price").textContent = price;
function updateCashInDrawer(){
    const cashInDrawer = document.getElementById("changeInDrawer");
    cashInDrawer.innerHTML = `
    <h3>Change in drawer</h3>
    <p>Pennies: <span id="pennies">${cid[0][1]}</span></p>
    <p>Nickels: <span id="nickel">${cid[1][1]}</span></p>
    <p>Dimes: <span id="dime"></span>${cid[2][1]}</p>
    <p>Quarters: <span id="quarter">${cid[3][1]}</span></p>
    <p>Ones: <span id="one">${cid[4][1]}</span></p>
    <p>Fives: <span id="five">${cid[5][1]}</span></p>
    <p>Tens: <span id="ten">${cid[6][1]}</span></p>
    <p>Twenties: <span id="twentie">${cid[7][1]}</span></p>
    <p>Hundreds: <span id="hundred">${cid[8][1]}</span></p>
    
    `;
}
updateCashInDrawer();
let cashInDrawer = cid.reduce((acc, el)=>{
    return acc + el[1];
}, 0)
console.log(cashInDrawer)
const purchase = document.getElementById("purchase-btn");
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
let payement = 0;
let reste = 0;
let historique = [];

purchase.addEventListener("click", () => {
    payement = parseFloat(cash.value);
    reste = Math.round((payement - price)*100) / 100;
    console.log(reste, " debut reste");
    if(cashInDrawer < reste){
        changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
        return
    }else if(cashInDrawer == reste){
        changeDue.innerHTML = `<p>Status: CLOSED</p>`;
        return
    }
    if(price > payement){
      alert("Customer does not have enough money to purchase the item");
      return
    }
    if(price == payement){
      changeDue.textContent = "No change due - customer paid with exact cash";
      return
    }

    if(reste >= 100){
        if(reste == 100){
            historique.push([cid[8][0], cid[8][1]]);
            reste -= cid[8][1];
            cid[8][1] = 0;
        }else{
            reste -= cid[8][1];
            historique.push([cid[8][0], cid[8][1]]);
            cid[8][1] = 0;
        }
        console.log("reste 100: ", reste);
    }

    if(reste / 20 >= 1){
        let division = reste / 20;
        if(division > 3){
            historique.push([cid[7][0], cid[7][1]]);
            reste = reste - cid[7][1]
            cid[7][1] = 0;
        }else if(division <= 3){
            let calcCid = cid[7][1] - (parseInt(division) * 20); 
            let calcHist = parseInt(division) * 20;
            historique.push([cid[7][0], calcHist]);
            cid[7][1] = calcCid;
            reste = Math.round((reste - calcHist) * 100) / 100;
        }
        
    }

    if(reste / 10 >= 1){
        let division = reste / 10;
        if(division > 2){
            historique.push([cid[6][0], cid[6][1]]);
            reste = reste - cid[6][1];
            cid[6][1] = 0;
        }else if(division <= 2){
            let calcCid = cid[6][1] - (parseInt(division) * 10); 
            let calcHist = parseInt(division) * 10;
            historique.push([cid[6][0], calcHist]);
            cid[6][1] = calcCid;
            reste = Math.round((reste - calcHist) * 100) / 100;
        }
        
    }

    if(reste / 5 >= 1){
        let division = reste / 5;
        if(division > 11){
            historique.push([cid[5][0], cid[5][1]]);
            reste = reste - cid[5][1];
            cid[5][1] = 0;
        }else if(division <= 11){
            let calcCid = cid[5][1] - (parseInt(division) * 5); 
            let calcHist = parseInt(division) * 5;
            historique.push([cid[5][0], calcHist]);
            cid[5][1] = calcCid;
            reste = Math.round((reste - calcHist) * 100) / 100;
        }
        
    }

    if(reste / 1 >= 1){
        let division = reste / 1;
        if(division > 90){
            historique.push([cid[4][0], cid[4][1]]);
            reste = reste - cid[4][1];
            cid[4][1] = 0;
        }else if(division <= 90){
            let calcCid = cid[4][1] - (parseInt(division) * 1); 
            let calcHist = parseInt(division) * 1;
            historique.push([cid[4][0], calcHist]);
            cid[4][1] = calcCid;
            reste = Math.round((reste - calcHist) * 100) / 100;
        }
        console.log(reste, " one")
        
    }

    if(reste / 0.25 >= 1 && cid[3][1] != 0){
        let division = reste / 0.25;
        let quantitePiece = cid[3][1] / 0.25;
        if(division > quantitePiece && quantitePiece != 0){
            historique.push([cid[3][0], cid[3][1]]);
            reste = reste - cid[3][1];
            cid[3][1] = 0;
            console.log("entrer dans ....")
        }else if(division <= quantitePiece){
            let calcCid = cid[3][1] - (parseInt(division) * 0.25); 
            let calcHist = parseInt(division) * 0.25;
            historique.push([cid[3][0], calcHist]);
            cid[3][1] = calcCid;
            reste = Math.round((reste - calcHist) * 100) / 100;
        }
        console.log(quantitePiece, " quarter", division)
    }

    if(reste / 0.1 >= 1 && cid[2][1] != 0){
        let division = reste / 0.1;
        let quantitePiece = cid[2][1] / 0.1;
        if(division > quantitePiece && quantitePiece != 0){
            historique.push([cid[2][0], cid[2][1]]);
            reste = reste - cid[2][1]
            cid[2][1] = 0;
        }else if(division <= quantitePiece){
            let calcCid = cid[2][1] - (parseInt(division) * 0.1); 
            let calcHist = parseInt(division) * 0.1;
            historique.push([cid[2][0], calcHist]);
            cid[2][1] = calcCid;
            reste = Math.round((reste - calcHist) * 100) / 100;
        }
        console.log(quantitePiece, " dime")
    }

    if(reste / 0.05 >= 1 && cid[1][1] != 0){
        let division = reste / 0.05;
        let quantitePiece = cid[1][1] / 0.05;
        if(division > quantitePiece && quantitePiece != 0){
            historique.push([cid[1][0], cid[1][1]]);
            reste = reste - cid[1][1];
            cid[1][1] = 0;
        }else if(division <= quantitePiece){
            let calcCid = cid[1][1] - (parseInt(division) * 0.05); 
            let calcHist = parseInt(division) * 0.05;
            historique.push([cid[1][0], calcHist]);
            cid[1][1] = calcCid;
            reste = Math.round((reste - calcHist) * 100) / 100;
        }
        console.log(reste, " nickel")
    }

    if(reste / 0.01 >= 1 && cid[0][1] != 0){
        let division = reste / 0.01;
        let quantitePiece = cid[0][1] / 0.01;
        if(division > quantitePiece && quantitePiece != 0){
            historique.push([cid[0][0], cid[0][1]]);
            reste = reste - cid[0][1];
            cid[0][1] = 0;
        }else if(division <= quantitePiece){
            let calcCid = cid[0][1] - (parseInt(division) * 0.01); 
            let calcHist = parseInt(division) * 0.01;
            historique.push([cid[0][0], calcHist]);
            cid[0][1] = calcCid;
            reste = Math.round((reste - calcHist) * 100) / 100;
        }
        console.log(quantitePiece, " penny")
    }


changeDue.innerHTML = `<p>Status: OPEN</p>`;
    historique.forEach(el => {
        changeDue.innerHTML += `<p>${el[0]}: $${el[1]}</p>`;
    });
    updateCashInDrawer();
});





