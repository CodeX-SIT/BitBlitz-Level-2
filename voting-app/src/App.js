import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "candidateName",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "candidateId",
        "type": "uint256"
      }
    ],
    "name": "getVoteCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "voterAddress",
        "type": "address"
      }
    ],
    "name": "registerVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "candidateId",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isRegistered",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "hasVoted",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "vote",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [groups, setGroups] = useState([]);
  const [voteCount, setVoteCount] = useState({});
  const [groupName, setGroupName] = useState('');
  const [connectedAccount, setConnectedAccount] = useState(null);

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const accounts = await provider.send("eth_requestAccounts", []);
    setConnectedAccount(accounts[0]);

    const signer = provider.getSigner();
    setSigner(signer);

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contract);

    loadGroups(contract);
  };


  const loadGroups = async (contract) => {
    const groupsCount = await contract.candidates.length;
    const loadedGroups = [];
    for (let i = 0; i < groupsCount; i++) {
      const group = await contract.candidates(i);
      loadedGroups.push(group);
    }
    setGroups(loadedGroups);
  };
  
  const addGroup = async () => {
    if (groupName) {
      await contract.addCandidate(groupName);
      loadGroups(contract);
    }
  };

  const voteForGroup = async (groupId) => {
    await contract.vote(groupId);
    loadVoteCounts();
  };

  const loadVoteCounts = async () => {
    const counts = {};
    for (let i = 0; i < groups.length; i++) {
      const voteCount = await contract.getVoteCount(i);
      counts[i] = voteCount;
    }
    setVoteCount(counts);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="my-4">Voting DApp</h1>
        {!connectedAccount ? (
          <button onClick={connectWallet} className="btn btn-primary">
            Connect Wallet
          </button>
        ) : (
          <div>
            <p>Connected as: {connectedAccount}</p>

            {/* Add Group */}
            <div>
              <h2>Add Group</h2>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
              <button onClick={addGroup} className="btn btn-success ml-2">
                Add Group
              </button>
            </div>

            {/* Group List */}
            <div className="mt-4">
              <h2>Groups</h2>
              <ul>
                {groups.map((group, index) => (
                  <li key={index}>
                    {group.name} - Votes: {voteCount[index] || 0}
                    <button onClick={() => voteForGroup(index)} className="btn btn-primary ml-2">
                      Vote
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;