// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "../interfaces/ITokenBase.sol";

contract TokenBaseContract is ITokenBase, ERC20 {
    address public owner;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = msg.sender;
    }

    function updateOwner(address newAdmin) external override {}

    function mint(address to, uint256 amount) external override {}

    function burn(address owner, uint256 amount) external override {}
}
