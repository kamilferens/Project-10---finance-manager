/*Zmienne */
const addBtn = document.querySelector("#add-button");
const deleteAllBtn = document.querySelector("#delete-all-button");
const cancelBtn = document.querySelector(".cancel");
const saveBtn = document.querySelector(".save");

const addArea = document.querySelector(".add-transaction");
const transactionArea = document.querySelector(".box-containers");
const incomesArea = document.querySelector(".incomes");
const outcomesArea = document.querySelector(".outcomes");
const balanceValue = document.querySelector("#balance-value");

const lightThemeBtn = document.querySelector(".light-theme");
const darkThemeBtn = document.querySelector(".dark-theme");
const deleteItemBtn = document.querySelector(".delete-item");

const nameSelect = document.querySelector("#name-select");
const addAmount = document.querySelector("#add-amount");
const addCategory = document.querySelector("#add-category");

/*Inne zmienne globalne */
// let transID = 0;
// let transID = 0;
let transID = 0;
let balance = 0;
let icon;

/*NOTATNIK  i TESTY*/

/*Funkcje wywoływane automatycznie */
balanceValue.textContent = balance;

/*Eventy */
addBtn.addEventListener("click", showAddPanel);
cancelBtn.addEventListener("click", () => {
    showAddPanel();
    clearAddPanel();
});
deleteAllBtn.addEventListener("click", () => {
    deleteAllItem();
    updateBalance();
});
saveBtn.addEventListener("click", addNewItem);

/*Skrypt - zmiana motywu */
// Przypisanie kolorów z ":root" do zmiennych

var r = document.querySelector(":root");
var rs = getComputedStyle(r);

let lightColor = rs.getPropertyValue("--light");
let darkColor = rs.getPropertyValue("--dark");

darkThemeBtn.addEventListener("click", () => {
    document.documentElement.style.setProperty("--dark", lightColor);
    document.documentElement.style.setProperty("--light", darkColor);

    reverseThemeBtnColor();
});

lightThemeBtn.addEventListener("click", () => {
    document.documentElement.style.setProperty("--light", lightColor);
    document.documentElement.style.setProperty("--dark", darkColor);

    reverseThemeBtnColor();
});

function reverseThemeBtnColor() {
    darkThemeBtn.style.backgroundColor = darkColor;
    darkThemeBtn.style.borderColor = lightColor;
    lightThemeBtn.style.backgroundColor = lightColor;
    lightThemeBtn.style.borderColor = darkColor;
}

/*Funkcje */
function showAddPanel() {
    const newElement = document.createElement("div");

    if (addArea.style.display !== "flex") {
        addArea.style.display = "flex";
    } else {
        addArea.style.display = "none";
    }
}

function deleteAllItem() {
    incomesArea.innerHTML = "";
    outcomesArea.innerHTML = "";
    balance = 0;
    transID = 0;
    updateBalance();
}

function addNewItem() {
    //Tutaj bym zrobił przypisanie do icon
    switch (addCategory.value) {
        case "income":
            icon = `<i class="fa-solid fa-money-check-dollar"></i>`;
            break;
        case "shopping":
            icon = `<i class="fa-solid fa-cart-shopping"></i>`;
            break;
        case "food":
            icon = `<i class="fa-solid fa-utensils"></i>`;
            break;
        case "cinema":
            icon = `<i class="fa-solid fa-film"></i>`;
            break;
    }

    //dla sprawdzenaia czy zmienna globalna icon uległa zmianie
    console.log("Icon: " + icon);

    newTransaction();
    showAddPanel();
    clearAddPanel();
}

function newTransaction() {
    const newItem = document.createElement("div");
    newItem.classList.add("transaction");
    newItem.setAttribute("id", transID);

    let area;

    if (
        nameSelect.value === "" ||
        addAmount.value === "" ||
        addCategory.value === "none"
    ) {
        alert("Najpierw wypełnij wszystkie pola");
        return;
    } else if (addAmount.value < 0) {
        area = outcomesArea;
    } else if (addAmount.value >= 0) {
        area = incomesArea;
    }

    newItem.innerHTML = `<div class="li-left">
    ${icon} ${nameSelect.value}
</div>
<div class="li-right"><span class="amount">${addAmount.value}</span>
zł
    <button class="delete-item" onclick="deleteElement(${transID}, ${
        addAmount.value < 0 ? "outcomesArea" : "incomesArea"
    })">
       
    <i class="fa-solid fa-xmark"></i>
    </button>
</div>`;
    area.appendChild(newItem);
    transID++;

    let x = Number.parseFloat(addAmount.value);
    balance += x;
    updateBalance();
}

function updateBalance() {
    balanceValue.textContent = balance;
}

function clearAddPanel() {
    nameSelect.value = "";
    addAmount.value = "";
    addCategory.value = "none";
}

function deleteElement(id, area) {
    const elementToDelete = document.getElementById(id);

    let amount = elementToDelete.querySelector(".amount");
    console.log(amount.textContent); // To jest string
    let amountNum = Number.parseFloat(amount.textContent); //To jest liczba
    console.log("amountNum: " + amountNum);
    console.log(amountNum);
    console.log(typeof amountNum);
    console.log(typeof balance);

    balance -= amountNum;
    area.removeChild(elementToDelete);

    updateBalance();
}

/*Funkcje zakomentowane - zrezygnowałem z nich */

// function newOutcome() {
//     const newItem = document.createElement("div");
//     newItem.classList.add("transaction");
//     newItem.setAttribute("id", transID);

//     newItem.innerHTML = `<div class="li-left">
//     ${icon} ${nameSelect.value}
// </div>
// <div class="li-right"><span class="amount">${addAmount.value.replace(
//         "-",
//         ""
//     )}</span>
//     zł
//     <button class="delete-item" onclick="deleteOutcome(${transID})">
//         <i class="fa-solid fa-xmark"></i>
//     </button>
// </div>`;

//     outcomesArea.appendChild(newItem);
//     transID++;

//     updateBalance();
// }

// function newIncome() {
//     const newItem = document.createElement("div");
//     newItem.classList.add("transaction");
//     newItem.setAttribute("id", transID);

//     newItem.innerHTML = `<div class="li-left">
//     ${icon} ${nameSelect.value}
// </div>
// <div class="li-right"><span class="amount">${addAmount.value}</span>
// zł
//     <button class="delete-item" onclick="deleteIncome(${transID})">

//     <i class="fa-solid fa-xmark"></i>
//     </button>
// </div>`;
//     incomesArea.appendChild(newItem);
//     transID++;

//     updateBalance();
// }

// function deleteIncome(id) {
//     const elementToDelete = document.getElementById(id);

//     let amount = elementToDelete.querySelector(".amount");
//     console.log(amount.textContent); // To jest string
//     let amountNum = Number.parseFloat(amount.textContent); //To jest liczba
//     console.log(amountNum);

//     incomesArea.removeChild(elementToDelete);
//     // transID--;

//     balance -= amountNum;
//     updateBalance();
// }

// function deleteOutcome(id) {
//     const elementToDelete = document.getElementById(id);

//     let amount = elementToDelete.querySelector(".amount");
//     console.log(amount.textContent); // To jest string
//     let amountNum = Number.parseFloat(amount.textContent); //To jest liczba
//     console.log(amountNum);

//     //Odwracamy liczbę tak by otrzymać wartość ujemną
//     amountNum = -amountNum;

//     outcomesArea.removeChild(elementToDelete);
//     // transID--;

//     balance -= amountNum;
//     updateBalance();
// }
