pragma solidity ^0.8.0;

import './TokenBase.sol';

contract TokenGoerli is TokenBase {
  constructor() TokenBase('Goerli Token', 'GTK') {}
}
