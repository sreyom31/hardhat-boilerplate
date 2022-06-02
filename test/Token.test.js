const { expect } = require("chai");

describe("Token Contract", () => {
  let Token, token, owner, addr1, addr2;
  beforeEach(async () => {
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  describe("Deployment", () => {
    it("Should set the right owner", async () => {
      expect(await token.owner()).to.equal(owner.address);
    });
    it("Check total Supply", async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(parseInt(await token.totalSupply())).to.equal(
        parseInt(ownerBalance)
      );
    });
  });
  describe("Transcations", () => {
    it("Should transfer tokens between accounts", async () => {
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(parseInt(addr1Balance)).to.equal(50);

      await token.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(parseInt(addr2Balance)).to.equal(50);
    });
    it("Should fail if sender does not have enough funds", async () => {
      const initialBalanceOwner = await token.balanceOf(owner.address);
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not Enough Tokens");
      expect(parseInt(await token.balanceOf(owner.address))).to.equal(
        parseInt(initialBalanceOwner)
      );
    });

    it("Should update balances after transfers", async () => {
      const initialBalanceOwner = await token.balanceOf(owner.address);

      await token.transfer(addr1.address, 100);
      await token.transfer(addr2.address, 50);

      const finalBalanceOwner = await token.balanceOf(owner.address);
      expect(parseInt(finalBalanceOwner)).to.equal(initialBalanceOwner - 150);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(parseInt(addr1Balance)).to.equal(100);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(parseInt(addr2Balance)).to.equal(50);
    });
  });
});
