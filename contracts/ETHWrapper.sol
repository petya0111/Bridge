// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../interfaces/IETHWrapper.sol";
import "./WETH.sol";

contract ETHWrapperContract is IETHWrapper {
    WETH public WETHToken;

    event LogETHWrapped(address sender, uint256 amount);
    event LogETHUnwrapped(address sender, uint256 amount);

    constructor(string memory name, string memory symbol) {
        WETHToken = new WETH(name, symbol);
    }

    function wrap() public payable override {
        require(msg.value > 0, "We need to wrap at least 1 WETH");
        WETHToken.mint(msg.sender, msg.value);
        emit LogETHWrapped(msg.sender, msg.value);
    }

    function unwrap(uint value) public payable override {
        require(value > 0, "We need to unwrap at least 1 WETH");
        WETHToken.transferFrom(msg.sender, address(this), value);
        WETHToken.burn(value);
        payable(msg.sender).transfer(value);
        emit LogETHUnwrapped(msg.sender, value);
    }
}
