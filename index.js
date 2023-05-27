var Account = /** @class */ (function () {
    function Account(bankName, owner, balance, accountNumber) {
        this.bankName = bankName;
        this.owner = owner;
        this.balance = balance;
        this.accountNumber = accountNumber;
    }
    Account.prototype.getBankName = function () {
        return this.bankName;
    };
    Account.prototype.getOwner = function () {
        return this.owner;
    };
    Account.prototype.getBalance = function () {
        return this.balance;
    };
    Account.prototype.getAccountNumber = function () {
        return this.accountNumber;
    };
    Account.prototype.deposit = function (amount) {
        this.balance += amount;
    };
    Account.prototype.withdraw = function (amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            return this.balance;
        }
        else {
            alert("Insufficient Funds");
        }
    };
    Account.prototype.transfer = function (amount, account) {
        if (this.balance >= amount) {
            this.balance -= amount;
            return account.deposit(amount);
        }
        else {
            alert("Insufficient Funds");
        }
    };
    return Account;
}());
var AccountRepository = /** @class */ (function () {
    function AccountRepository(accts) {
        this.accounts = accts;
    }
    AccountRepository.prototype.getAccountByAccountNumber = function (accountNumber) {
        var requiredAccount = this.accounts.find(function (account) { return account.getAccountNumber() === accountNumber; });
        if (!requiredAccount)
            return null;
        return requiredAccount;
    };
    return AccountRepository;
}());
var user1 = new Account("NewBank", "Ade Gabriel", 3000, "12000002");
var user2 = new Account("NewBank", "Adetayo Omotomiwa", 10000, "12000003");
var accounts = new AccountRepository([user1, user2]);
var currencyUtility = function (number) {
    var CURRENCY_FORMATTER = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
    return CURRENCY_FORMATTER.format(number);
};
var updateUI = function () {
    if (document) {
        //   User One
        var userOneAccountBalance = document.getElementById("user_one_balance");
        var userOneAccountNumber = document.getElementById("user_one_account_number");
        var userOneUserName = document.getElementById("user_one_username");
        userOneAccountBalance.innerHTML = "<span>Balance: <span/> <span class=\"font-semibold\" >".concat(currencyUtility(user1.getBalance()), "</span>");
        userOneAccountNumber.innerHTML = "<span>Account Number: </span> <span class=\"font-semibold\">".concat(user1.getAccountNumber(), " </span> ");
        userOneUserName.innerHTML = "<span>Account Name: </span> <span class=\"font-semibold\">".concat(user1.getOwner(), " </span> ");
        //   userOneUserName.innerText = `Name: ${user1.getOwner()}`;
    }
};
// withdraw
var withdraw = function (sectionId, user) {
    var userSection = document.getElementById(sectionId);
    var formElement = userSection.querySelector(".withdraw-form");
    var withdrawInput = formElement.getElementsByTagName("input")[0];
    formElement.addEventListener("submit", function (e) {
        e.preventDefault();
        var amount = Number(withdrawInput.value) || 0;
        user.withdraw(amount);
        updateUI();
        withdrawInput.value = "";
    });
};
//  
withdraw("user-one", user1);
var deposit = function (sectionId, user) {
    var userSection = document.getElementById(sectionId);
    var formElement = userSection.querySelector(".deposit-form");
    var depositInput = formElement.getElementsByTagName("input")[0];
    formElement.addEventListener("submit", function (e) {
        e.preventDefault();
        var amount = Number(depositInput.value) || 0;
        user.deposit(amount);
        updateUI();
        depositInput.value = "";
    });
};
deposit("user-one", user1);
var transfer = function (sectionId, user) {
    var userSection = document.getElementById(sectionId);
    var formElement = userSection.querySelector(".transfer-form");
    var accountNumber = formElement.getElementsByTagName("input")[0];
    var transferInput = formElement.getElementsByTagName("input")[1];
    formElement.addEventListener("submit", function (e) {
        e.preventDefault();
        var amountToSend = Number(transferInput.value);
        var receivingUser = accounts.getAccountByAccountNumber(accountNumber.value);
        if (!receivingUser) {
            alert("Account Not found.");
            return;
        }
        user.transfer(amountToSend, receivingUser);
        updateUI();
        accountNumber.value = "";
        transferInput.value = "";
    });
};
transfer("user-one", user1);
updateUI();
