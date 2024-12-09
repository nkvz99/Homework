console.log("Connected")



let balance = 500;

function withdraw(amount) {
    if (Number.isNaN(amount)) {
        alert('Please enter a valid amount in numbers.');
        let newwithdrawamount = parseInt(prompt('Enter the amount you want to withdraw in numbers:'));
        return withdraw(newwithdrawamount); 
    } else if (amount > balance) {
        alert('Not enough balance.');
        let newwithdrawamount = parseInt(prompt(`Your balance is ${balance}. Please enter an amount less than or equal to your balance:`));
        return withdraw(newwithdrawamount); 
    } else {
        balance -= amount;
        return `You withdrew ${amount}. Your remaining balance is ${balance}.`;
    }
}

let withdrawAmount = parseInt(prompt('Enter the amount you want to withdraw:'));
let result = withdraw(withdrawAmount);
alert(result);