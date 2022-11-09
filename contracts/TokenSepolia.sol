pragma solidity ^0.8.0;

import './TokenBase.sol';

contract TokenSepolia is TokenBase {
  constructor() TokenBase('Sepolia Token', 'STK') {}
}
