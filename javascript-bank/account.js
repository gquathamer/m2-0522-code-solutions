/* exported Account */
function Account(number, holder) {
  this.number = number;
  this.holder = holder;
  this.transactions = [];
}

Account.prototype.deposit = function (amount) {
  if (!Number.isInteger(amount) || amount <= 0) {
    return false;
  }
  var newTransaction = new Transaction('deposit', amount);
  this.transactions.push(newTransaction);
  return true;
};

Account.prototype.withdraw = function (amount) {
  if (!Number.isInteger(amount) || amount <= 0) {
    return false;
  }
  var newTransaction = new Transaction('withdrawal', amount);
  this.transactions.push(newTransaction);
  return true;
};

Account.prototype.getBalance = function () {
  var withdrawals = 0;
  var deposits = 0;
  for (var i = 0; i < this.transactions.length; i++) {
    if (this.transactions[i].type === 'deposit') {
      deposits += this.transactions[i].amount;
    } else {
      withdrawals += this.transactions[i].amount;
    }
  }
  return deposits - withdrawals;
};
