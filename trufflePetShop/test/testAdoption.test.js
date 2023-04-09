const Adoption = artifacts.require("Adoption"); // deploy contract cần test
// const nameofContract = artifacts.require("Name of contract")


contract("Adoption", (accounts) => {
  let adoption;
  let expectedPetId; //khai báo biến ko cần lắm

  before(async () => {
      adoption = await Adoption.deployed();
  }); // deploy contract 

  describe("adopting a pet and retrieving account addresses", async () => {//decribe what we want to check
    // before("message", async () => {await instanceContract.function(argument)}; )
    before("adopt a pet using accounts[0]", async () => {
      await adoption.adopt(8, { from: accounts[0] }); //hàm adopt (nhận nuôi pet 8 từ account 1)
      expectedAdopter = accounts[0]; //người nhận nuôi kì vọng sô 1 
    });

    it("can fetch the address of an owner by pet id", async () => {
        const adopter = await adoption.adopters(8); //lấy người nhận nuôi pét 8
        assert.equal(adopter, expectedAdopter, "The owner of the adopted pet should be the first account.");
    });


    it("can fetch the collection of all pet owners' addresses", async () => {
        const adopters = await adoption.getAdopters(); // lấy toàn bộ người nhận nuôi và test người nhận nuôi pet 8
        assert.equal(adopters[8], expectedAdopter, "The owner of the adopted pet should be in the collection.");
      });
    
  });
});
