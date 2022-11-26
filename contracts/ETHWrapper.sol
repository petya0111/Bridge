// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../interfaces/IETHWrapper.sol";
import "./ERC20Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHWrapperContract is Ownable, IETHWrapper {
    mapping(address => ERC20Token) private wTokenContracts;

    event LogETHWrapped(address sender, uint256 amount);
    event LogETHUnwrapped(address sender, uint256 amount);
    event LogETHApproved(address spender, uint256 amount);
    event LogETHTokenCreated(address indexed contractAddr, string name, string symbol);

    function initiateToken(string memory _name, string memory _symbol)
        external
        override
        onlyOwner
    {
        ERC20Token wContract = new ERC20Token(_name, _symbol, msg.sender);
        wTokenContracts[address(wContract)] = wContract;
        emit LogETHTokenCreated(address(wContract), _name, _symbol);
    }

    function getTokenContractAddress(address token)
        public
        view
        returns (ERC20Token)
    {
        return wTokenContracts[token];
    }

    function wrap(address tokenAddress) public payable override {
        require(msg.value > 0, "We need to wrap at least 1 WETH");
        wTokenContracts[tokenAddress].mint(msg.sender, msg.value);
        emit LogETHWrapped(msg.sender, msg.value);
    }

    function approve(
        address tokenAddress,
        address spender,
        uint256 amount
    ) public {
        wTokenContracts[tokenAddress].approve(spender, amount);
        emit LogETHApproved(spender, amount);
    }

    function unwrap(address tokenAddress, uint256 value)
        public
        payable
        override
    {
        require(value > 0, "We need to unwrap at least 1 WETH");
        wTokenContracts[tokenAddress].transferFrom(
            msg.sender,
            address(this),
            value
        );
        wTokenContracts[tokenAddress].burn(value);
        payable(msg.sender).transfer(value);
        emit LogETHUnwrapped(msg.sender, value);
    }
}
