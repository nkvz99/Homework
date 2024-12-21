console.log("Connected")

function withdraw(amount) {
    if (Number.isNaN(amount)) {
        alert('Please enter a valid amount in numbers.');
        let newwithdrawamount = parseInt(prompt('Enter the amount you want to withdraw in numbers:'));
        return withdraw(newwithdrawamount); 
    } else if (amount > balance) {
        alert('You dont have enought monney');
        let newwithdrawamount = parseInt(prompt(`Your balance is ${balance}. Please enter an amount less than or equal to your balance:`));
        return withdraw(newwithdrawamount); 
    } else {
        balance -= amount;
        return `You withdraw ${amount}. Your remaining balance is ${balance}.`;
    }
}
let balance = 500;
let withdrawamount = parseInt(prompt('Enter the amount you want to withdraw:'));
let result = withdraw(withdrawamount);
alert(result);




