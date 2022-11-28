// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/ITokenLedger.sol";

contract TokenLedger is
    Ownable,
    ITokenLedger
{
    uint16 private sourceChainId;
    mapping(address => mapping(uint16 => address))
        private sourceTokenToTargetToken;
    mapping(address => mapping(uint16 => address))
        private targetTokenToSourceToken;

    event TokenConnectionRegistered(
        address indexed sourceToken,
        address indexed targetToken,
        uint16 sourceChainId,
        uint16 targetChainId
    );

    constructor() {
        sourceChainId = uint16(block.chainid);
    }

    function getTargetTokenAddress(address _sourceToken, uint16 _targetChainId)
        external
        view
        override
        returns (address)
    {
        return sourceTokenToTargetToken[_sourceToken][_targetChainId];
    }

    function getSourceTokenAddress(address _targetToken, uint16 _sourceChainId)
        external
        view
        override
        returns (address)
    {
        return targetTokenToSourceToken[_targetToken][_sourceChainId];
    }

    function registerTargetTokenAddress(
        address _sourceToken,
        uint16 _targetChainId,
        address _targetToken
    ) external override {
        require(_sourceToken != address(0), "Invalid source address");
        require(_targetToken != address(0), "Invalid target address");

        sourceTokenToTargetToken[_sourceToken][_targetChainId] = _targetToken;
        targetTokenToSourceToken[_targetToken][sourceChainId] = _sourceToken;

        emit TokenConnectionRegistered(
            _sourceToken,
            _targetToken,
            sourceChainId,
            _targetChainId
        );
    }
}
