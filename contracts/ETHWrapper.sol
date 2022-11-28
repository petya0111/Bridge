// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "../interfaces/IETHWrapper.sol";
import "./ERC20Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHWrapperContract is Ownable, IETHWrapper {
    mapping(address => ERC20Token) private wTokenContracts;

    event LogETHApproved(address spender, uint256 amount);
    event LogETHTokenCreated(
        address indexed contractAddr,
        string name,
        string symbol
    );
    event LogWTokenMinted(address to, uint256 amount);

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

    function approve(
        address tokenAddress,
        address spender,
        uint256 amount
    ) public override {
        wTokenContracts[tokenAddress].approve(spender, amount);
        emit LogETHApproved(spender, amount);
    }
}
