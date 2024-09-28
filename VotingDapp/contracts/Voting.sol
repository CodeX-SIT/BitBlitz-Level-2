// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint vote;
    }

    struct Group {
        string name;
        uint voteCount;
    }

    address public admin;
    mapping(address => Voter) public voters;
    Group[] public groups;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this.");
        _;
    }

    function registerGroup(string memory groupName) public onlyAdmin {
        groups.push(Group({
            name: groupName,
            voteCount: 0
        }));
    }

    function registerVoter(address voterAddress) public onlyAdmin {
        require(!voters[voterAddress].isRegistered, "Voter already registered.");
        voters[voterAddress].isRegistered = true;
        voters[voterAddress].hasVoted = false;
    }

    function vote(uint groupId) public {
        require(voters[msg.sender].isRegistered, "You are not a registered voter.");
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        require(groupId < groups.length, "Invalid group ID.");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].vote = groupId;
        groups[groupId].voteCount += 1;
    }

    function getVoteCount(uint groupId) public view returns (uint) {
        require(groupId < groups.length, "Invalid group ID.");
        return groups[groupId].voteCount;
    }
}
