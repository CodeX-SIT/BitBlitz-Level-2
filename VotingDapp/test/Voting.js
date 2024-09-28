const { expect } = require("chai");

describe("Voting Contract", function () {
  let VotingContract;
  let voting;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    VotingContract = await ethers.getContractFactory("Voting");
    [owner, addr1, addr2] = await ethers.getSigners();
    voting = await VotingContract.deploy();
  });

  it("Should deploy successfully", async function () {
    // expect(voting.address).to.not.equal(undefined);
    expect(voting.address).to.not.equal("");
    expect(voting.address).to.not.equal(null);
  });

  it("Should add a group", async function () {
    await voting.addCandidate("Candidate 1");
    const group = await voting.candidates(0);
    expect(group.name).to.equal("Candidate 1");
  });

  it("Should allow voting for a candidate", async function () {
    await voting.addCandidate("Candidate 1");
    await voting.registerVoter(addr1.address);
    await voting.connect(addr1).vote(0);
    const group = await voting.candidates(0);
    expect(group.voteCount).to.equal(1);
  });

  it("Should prevent voting twice", async function () {
    await voting.addCandidate("Group 1");
    await voting.registerVoter(addr1.address);
    await voting.connect(addr1).vote(0);
    await expect(voting.connect(addr1).vote(0)).to.be.revertedWith("You have already voted.");
  });

  it("Should prevent voting for non-existent candidates", async function () {
    await voting.addCandidate(addr1.address);
    await expect(voting.connect(addr1).vote(1)).to.be.revertedWith("You are not a registered voter.");
  });
});
