var Splitter = artifacts.require("./Splitter.sol");

contract("Splitter contract", function(accounts) {

    var owner = accounts[0];
    var bobAddress = accounts[1];
    var carolAddress = accounts[2];

    var aliceWeiPay = 5000;

    var contract;

    beforeEach(function() {
        return Splitter.new(owner, bobAddress, carolAddress, {from: owner})
                .then( instance => contract = instance);
    })

    it("should split payment of alice to bob and carol", function() {
        var bobBalance = web3.eth.getBalance(bobAddress);
        var carolBalance = web3.eth.getBalance(carolAddress);
        var bobNewBalance;
        var carolNewBalance;

        return contract.sendTransaction({from: owner, value: aliceWeiPay})
            .then(function(tx) {
                bobNewBalance = web3.eth.getBalance(bobAddress);
                carolNewBalance = web3.eth.getBalance(carolAddress);
                
                assert.equal(bobNewBalance.toString(10), bobBalance.plus(aliceWeiPay/2).toString(10), "Bob's balance is wrong.");
                assert.equal(carolNewBalance.toString(10), carolBalance.plus(aliceWeiPay/2).toString(10), "Carol's balance is wrong.");
            });
    })

})