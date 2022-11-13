pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

interface TokenBase {
// is ERC20 {
  // address public owner;

  // constructor(string memory name, string memory symbol) ERC20(name, symbol) {
  //   owner = msg.sender;
  // }

  function updateOwner(address newAdmin) external;

  function mint(address to, uint amount) external;

  function burn(address owner, uint amount) external;
}

