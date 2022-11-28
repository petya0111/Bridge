// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IBridgeBase {
    function lockToken(
        uint16 _targetChainId,
        address payable _token,
        uint256 _amount
    ) external payable;

    function mint(
        address _receiver,
        uint256 _amount,
        address payable _wrappedToken
    ) external;

    function burn(
        uint16 _targetChainId,
        address _wrappedToken,
        uint256 _amount
    ) external payable;

    function release(uint256 _amount, address payable _token) external;

    function createToken(string calldata _name, string calldata _symbol)
        external;
}
