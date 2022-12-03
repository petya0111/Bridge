// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/ITokenLedger.sol";

contract TokenLedger is Ownable, ITokenLedger {
    uint32 private sourceChainId;
    mapping(address => mapping(uint32 => address)) private sourceTokenToTargetToken;
    mapping(address => mapping(uint32 => address)) private targetTokenToSourceToken;

    event TokenConnectionRegistered(
        address indexed sourceToken,
        address indexed targetToken,
        uint32 sourceChainId,
        uint32 targetChainId
    );

    constructor() {
        sourceChainId = uint32(block.chainid);
    }

    function getTargetTokenAddress(address _sourceToken, uint32 _targetChainId)
        external
        view
        override
        returns (address)
    {
        return sourceTokenToTargetToken[_sourceToken][_targetChainId];
    }

    function getSourceTokenAddress(address _targetToken, uint32 _sourceChainId)
        external
        view
        override
        returns (address)
    {
        return targetTokenToSourceToken[_targetToken][_sourceChainId];
    }

    function registerTargetTokenAddress(
        address _sourceToken,
        uint32 _targetChainId,
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
