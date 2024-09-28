// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        string imageHash; // IPFS hash for candidate image
        uint voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidateCount;

    constructor (uint _candidateCount) {
        candidateCount = _candidateCount;
    }

    function addCandidate(string memory _name, string memory _imageHash) public {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, _imageHash, 0);
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate ID.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
    }
}