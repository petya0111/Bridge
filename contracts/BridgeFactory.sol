// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TokenBase.sol";
import "../interfaces/IBridgeBase.sol";

contract BridgeBase is IBridgeBase {
    TokenBase public token;
    uint256 public chainId;
    // depositCounts - counts number of deposits that we have, to not repeat the same deposit twice
    mapping(uint256 => uint256) public depositCounts;
    // assetIdToTokenAddress - a way to link tokens from source chain to target chain
    mapping(bytes32 => address) public assetIdToTokenAddress;
    mapping(address => bool) public burnList;
    mapping(address => mapping(uint => bool)) public claimedTokens;
    // processedNonces - count on each chain, how many transactions we have to not repeat them
    mapping(address => mapping(uint => bool)) public processedNonces;

    constructor(address _token) {
        token = TokenBase(_token);
        chainId = block.chainid;
    }

    event Transfer(
        address from,
        address to,
        uint amount,
        uint date,
        uint nonce
    );
    event ClaimedToken(address from, address to, address token, uint date);

    function lock(
        address to,
        uint amount,
        uint nonce,
        bytes calldata signature
    ) external override {}

    function burn(
        address to,
        uint amount,
        uint nonce,
        bytes calldata signature
    ) external override {}

    function claim(
        address token,
        address from,
        address to
    ) external override {}

    function mint(
        address from,
        address to,
        uint amount,
        uint nonce,
        bytes calldata signature
    ) external override {}
}
