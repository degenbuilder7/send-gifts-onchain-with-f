// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface SendGiftsonFarcasterInterface {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract SendGiftsonFarcaster {
    address public owner;
    mapping(address => bool) private verifiedTokens;
    address[] public verifiedTokenList;
    mapping(bytes32 => Transaction) private claimableGifts;
    mapping(uint256 => Transaction) private timelockedGifts;
    mapping(address => bool) public verifiedCharities;
    mapping(bytes32 => Transaction) private codeBasedTransactions;

    uint256 private nonce = 0;

    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 unlockTime;
    }

    event TransactionCompleted(address indexed sender, address indexed receiver, uint256 amount, string message);
    event TimelockGiftCreated(uint256 indexed giftId, address indexed sender, uint256 unlockTime);
    event GiftClaimed(address indexed claimant, uint256 amount);
    event CharityDonationMade(address indexed donor, address indexed charityAddress, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    modifier onlyVerifiedToken(address _token) {
        require(verifiedTokens[_token], "Token is not verified");
        _;
    }

    function addVerifiedToken(address _token) external onlyOwner {
        verifiedTokens[_token] = true;
        verifiedTokenList.push(_token);
    }

    function removeVerifiedToken(address _token) external onlyOwner {
        require(verifiedTokens[_token], "Token is not verified");
        verifiedTokens[_token] = false;
    }

    function addVerifiedCharity(address _charity) external onlyOwner {
        verifiedCharities[_charity] = true;
    }

    function removeVerifiedCharity(address _charity) external onlyOwner {
        require(verifiedCharities[_charity], "Charity is not verified");
        verifiedCharities[_charity] = false;
    }

    function createTimelockedGift(SendGiftsonFarcasterInterface token, address to, uint256 amount, uint256 unlockTime, string calldata message) external onlyVerifiedToken(address(token)) {
        require(unlockTime > block.timestamp, "Unlock time must be in the future");
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        timelockedGifts[nonce] = Transaction({
            sender: msg.sender,
            receiver: to,
            amount: amount,
            message: message,
            unlockTime: unlockTime
        });

        emit TimelockGiftCreated(nonce, msg.sender, unlockTime);
        nonce++;
    }

    function claimTimelockedGift(uint256 giftId) external {
        require(block.timestamp >= timelockedGifts[giftId].unlockTime, "Gift is still locked");
        require(timelockedGifts[giftId].receiver == msg.sender, "Only the designated receiver can claim this gift");

        SendGiftsonFarcasterInterface token = SendGiftsonFarcasterInterface(address(this)); // Assuming this contract handles its own token logic for simplicity
        require(token.transferFrom(address(this), msg.sender, timelockedGifts[giftId].amount), "Transfer failed");
        emit GiftClaimed(msg.sender, timelockedGifts[giftId].amount);

        delete timelockedGifts[giftId];
    }

    function donateToCharity(SendGiftsonFarcasterInterface token, address charityAddress, uint256 amount, string calldata message) external onlyVerifiedToken(address(token)) {
        require(verifiedCharities[charityAddress], "Not a verified charity");
        require(token.transferFrom(msg.sender, charityAddress, amount), "Transfer failed");

        emit CharityDonationMade(msg.sender, charityAddress, amount);
    }


function createGiftWithClaimCode(SendGiftsonFarcasterInterface token, address to, uint256 amount, string calldata message, string calldata claimCode) external onlyVerifiedToken(address(token)) {
    require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

    bytes32 codeHash = keccak256(abi.encodePacked(claimCode));
    require(codeBasedTransactions[codeHash].amount == 0, "Code already in use");

    codeBasedTransactions[codeHash] = Transaction({
        sender: msg.sender,
        receiver: to,
        amount: amount,
        message: message,
        unlockTime: 0
    });
}
// The functions for gift claim codes
function claimGiftWithCode(string calldata claimCode) external {
    bytes32 codeHash = keccak256(abi.encodePacked(claimCode));
    Transaction memory txn = codeBasedTransactions[codeHash];
    require(txn.amount > 0, "Invalid code");
    require(txn.receiver == msg.sender, "Unauthorized receiver");

    SendGiftsonFarcasterInterface token = SendGiftsonFarcasterInterface(address(this)); // Assuming this contract handles its own token logic for simplicity
    require(token.transferFrom(address(this), msg.sender, txn.amount), "Transfer failed");

    emit GiftClaimed(msg.sender, txn.amount);
    delete codeBasedTransactions[codeHash];
}


struct RecurringGift {
    address tokenAddress;
    address from;
    address to;
    uint256 amount;
    uint256 interval;
    uint256 nextDueDate;
}

RecurringGift[] public recurringGifts;

function setupRecurringGift(SendGiftsonFarcasterInterface token, address to, uint256 amount, uint256 interval) external onlyVerifiedToken(address(token)) {
    recurringGifts.push(RecurringGift({
        tokenAddress: address(token),
        from: msg.sender,
        to: to,
        amount: amount,
        interval: interval,
        nextDueDate: block.timestamp + interval
    }));
}

// This function would need to be called periodically, possibly by an off-chain service, to process due gifts.
function processRecurringGifts() external {
    for(uint i = 0; i < recurringGifts.length; i++) {
        if(block.timestamp >= recurringGifts[i].nextDueDate) {
            SendGiftsonFarcasterInterface token = SendGiftsonFarcasterInterface(recurringGifts[i].tokenAddress);
            require(token.transferFrom(recurringGifts[i].from, recurringGifts[i].to, recurringGifts[i].amount), "Transfer failed");

            recurringGifts[i].nextDueDate += recurringGifts[i].interval;
        }
    }
}

}
