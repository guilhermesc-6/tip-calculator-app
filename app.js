// Variavéis
const bill = document.querySelector("input#bill");
const tipBtn = document.querySelector(".tip-btn");
const peoples = document.querySelector("input#people");
const tipFinal = document.querySelector("#tip-final");
const totalFinal = document.querySelector("#total-final");
const resetBtn = document.querySelector(".reset-btn button");
const customBtn = document.querySelector(".custom-btn");

// Funçoes

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;

const app = () => {
  bill.addEventListener("change", () => {
    billValue = bill.value;
    resetBtn.classList.add("selected");
    if (tipValue === 0 || peopleValue === 0) {
      return;
    } else {
      calculateTip();
    }
  });

  tipBtn.addEventListener("click", (e) => {
    tipValue = e.target.value.slice(0, -1);
    customBtn.addEventListener("change", () => {
      tipValue = customBtn.value;
    });
    resetBtn.classList.add("selected");

    // verifica se existe outro botão com a classe "selected"
    let tipBtns = [...tipBtn.children];
    tipBtns.forEach((btn) => {
      if (btn.classList.contains("selected")) {
        btn.classList.remove("selected");
      }
    });
    e.target.classList.add("selected");
    if (billValue === 0 || peopleValue === 0) {
      return;
    } else {
      calculateTip();
    }
  });

  peoples.addEventListener("change", () => {
    peopleValue = peoples.value;
    resetBtn.classList.add("selected");
    if (billValue === 0 || tipValue === 0) {
      return;
    } else {
      calculateTip();
    }
  });

  // verifica se todos os campos estão com valores, para então chamar a função calculateTip
  if (billValue === 0 || peopleValue === 0 || tipValue === 0) {
    return;
  } else {
    calculateTip();
  }
};

const calculateTip = () => {
  let bills = Number(billValue);
  let tip = Number(tipValue);
  let people = Number(peopleValue);

  let tipAmount = (bills * tip) / 100;

  let perPerson = tipAmount / people;
  let totalPerPerson = bills / people + perPerson;

  tipFinal.innerText = `$${perPerson.toFixed(2)}`;
  totalFinal.innerText = `$${totalPerPerson.toFixed(2)}`;
};

resetBtn.addEventListener("click", () => {
  billValue = 0;
  tipValue = 0;
  peopleValue = 0;

  let tipBtns = [...tipBtn.children];
  tipBtns.forEach((btn) => {
    if (btn.classList.contains("selected")) {
      btn.classList.remove("selected");
    }
  });

  bill.value = "";
  peoples.value = "";
  customBtn.value = "";

  tipFinal.innerText = `$0.00`;
  totalFinal.innerText = "$0.00";

  resetBtn.classList.remove("selected");
});

app();
