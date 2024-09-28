// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Voting {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint vote;
    }

    struct Candidate {
        string name;
        uint voteCount;
    }

    address public admin;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    uint256 public c = 0;
    uint256 public num = 100;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this.");
        _;
    }

    function getCount() public view returns (uint256) {
        return num;
    }


    function addCandidate(string memory candidateName) public onlyAdmin {
        c = c+1;
        candidates.push(Candidate({
            name: candidateName,
            voteCount: 0
        }));
    }

    function registerVoter(address voterAddress) public onlyAdmin {
        require(!voters[voterAddress].isRegistered, "Voter already registered.");
        voters[voterAddress].isRegistered = true;
        voters[voterAddress].hasVoted = false;
    }

    function vote(uint candidateId) public {
        require(voters[msg.sender].isRegistered, "You are not a registered voter.");
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        require(candidateId < candidates.length, "Candidate does not exist.");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].vote = candidateId;
        candidates[candidateId].voteCount += 1;
    }

    function getVoteCount(uint candidateId) public view returns (uint) {
        require(candidateId < candidates.length, "Candidate does not exist.");
        return candidates[candidateId].voteCount;
    }

    
}
