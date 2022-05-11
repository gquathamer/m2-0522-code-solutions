/* exported Account */
function Account(number, holder) {
  this.number = number;
  this.holder = holder;
  this.transactions = [];
}

Account.prototype.deposit = function (amount) {
  if (amount < 0) {
    return false;
  }
  var newTransaction = new Transaction('deposit', amount);
  this.transactions.push(newTransaction);
  return true;
};
