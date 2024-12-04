// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Staking is Ownable,ReentrancyGuard{
    using SafeERC20 for IERC20;
    uint decimal = 10**18;
    uint public poolCount;

  constructor()Ownable(msg.sender){}
// Define User, Pool and Notification structures
     struct User {
        uint256 amount; // Amount staked by user
        uint256 lastReward; // Last reward timestamp for calculating pending rewards
        uint256 lockUtil; // Last reward timestamp for calculating pending rewards
     }

     struct Pool {
        IERC20 depositToken;// The token being staked
        IERC20 rewardToken;// The token used for rewards
        uint256 apy; // Annual Percentage Yield (APY) for the pool
        uint256 depositAmount; // Total amount of tokens deposited in the pool
        uint256 lockDays;// Lock duration for the deposit (in days)
    }

      struct Notification {
        uint256 poolId;
        uint256 amount;
        address user;
        string typeOf; // Deposit or Withdraw action
        uint256 timestamp; // Timestamp of the notification
      }

    // Pools, Notifications, and user state
    Pool[] public pool;
    Notification[] public notification;

    mapping(address =>uint256) public depositTokens;
    mapping(uint256 => mapping(address => User)) public user;

  // Add a new staking pool
    function addPool(IERC20 _depositToken,IERC20 _rewardToken, uint256 _apy,uint256 _lockDays )public onlyOwner{
        poolCount++;
        pool.push(Pool({
            depositToken:_depositToken,
            rewardToken:_rewardToken,
            apy:_apy,
            depositAmount:0,
            lockDays:_lockDays
        }));
    }


    function deposit(uint256 _poolId, uint256 _amount)public nonReentrant{
        Pool storage selectPool = pool[_poolId];
        require(_amount > 0,"Amount should be greater than zero");
        User storage currentUser =  user[_poolId][msg.sender];
        require(IERC20(selectPool.depositToken).balanceOf(msg.sender) >= _amount, "Insufficient balance");
        require(block.timestamp >= currentUser.lockUtil,"Tokens are still locked" );
             // Transfer pending reward to the user before deposit
            uint256 pending = _processingTime(currentUser,_poolId);
        if(pending > 0){
            selectPool.rewardToken.safeTransfer(msg.sender, pending);

             // Create notification for user
            _createNotification(_poolId,msg.sender,"Claim", pending);
        }
         // Transfer the deposit amount
        selectPool.depositToken.safeTransferFrom(msg.sender,address(this), _amount);
        selectPool.depositAmount += _amount;
        currentUser.amount += _amount;
         // Update user's last reward and lock time
        currentUser.lastReward = block.timestamp;
        // block.timestamp => current time : 1733259032;
        // 1days = 86400 seconds;
        // lockdays -> example : 3
        // lockUtil = 1733259032 + (3 * 86400);
        // convert link : https://www.unixtimestamp.com/
        currentUser.lockUtil = block.timestamp + (selectPool.lockDays * 1 days);
        
        depositTokens[address(selectPool.depositToken)] += _amount;
         // Create notification for the deposit action
        _createNotification(_poolId, msg.sender, "Deposit", _amount);

    }

    function withdraw(uint256 _poolId,uint256 _amount) public nonReentrant{
        Pool storage selectPool = pool[_poolId];
        User storage currentUser =  user[_poolId][msg.sender]; 
        require(currentUser.amount >= _amount,"Withdraw amount exceed the balance");
        require(currentUser.lockUtil <= block.timestamp,"Tokens are locked");
        // Transfer pending reward to the user before withdrawal
        uint256 pending = _processingTime(currentUser,_poolId);
        if(pending > 0){
             // Transfer reward to the user
            selectPool.rewardToken.safeTransfer(msg.sender, pending);

             // Create notification for user
            _createNotification(_poolId,msg.sender,"Claim", pending);
        }
        // Withdraw the staked amount
        if(_amount > 0 ){
            currentUser.amount -= _amount;
            selectPool.depositAmount -= _amount;
            depositTokens[address(selectPool.depositToken)] -= _amount;
            selectPool.depositToken.safeTransfer(msg.sender, _amount);
        }

            currentUser.lastReward = block.timestamp;
              // Create notification for the withdraw action
            _createNotification(_poolId,msg.sender,"Withdraw",_amount);
        
    }

    function _processingTime(User storage currentUser, uint256 poolId) internal view returns(uint){
        Pool storage selectPool = pool[poolId];

        uint256 dayPassed = (block.timestamp - currentUser.lastReward )/1 days;
        // If no days passed, no reward yet
        if (dayPassed == 0) return 0;

        if(dayPassed > selectPool.lockDays){
            dayPassed = selectPool.lockDays;
        }
        
        uint reward = (currentUser.amount * dayPassed * selectPool.apy) / (365 * 100 * decimal); // APY calculation
        return reward;
    }

    function pendingReward(address _user,uint256 _poolId) public view returns(uint){
        User storage currentUser  = user[_poolId][_user];
        return _processingTime(currentUser,_poolId);
    }

    function withdrawStakedTokens(address token,uint256 amount)external onlyOwner{
        uint256 tokenBalance = IERC20(token).balanceOf(address(this));
        require(tokenBalance >= amount,"Insufficient balance in contract");
        IERC20(token).safeTransfer(msg.sender, amount);
    }

    function modifierPool(uint _poolId, uint _apy) public onlyOwner{
        Pool storage currentPool = pool[_poolId];
        currentPool.apy = _apy;
    }

    function claimReward(uint _poolId) public nonReentrant{
        Pool storage selectPool = pool[_poolId];
        User storage currentUser =  user[_poolId][msg.sender]; 

        require(currentUser.lockUtil <= block.timestamp,"Tokens are locked");
        uint256 pending = _processingTime(currentUser,_poolId);
        require(pending > 0,"No reward claim");
        // Update the lastReward before transferring tokens to prevent reentrancy attacks
        currentUser.lastReward = block.timestamp;
        // Transfer the reward
        selectPool.rewardToken.safeTransfer(msg.sender,pending);
        // Create notification for user
        _createNotification(_poolId,msg.sender,"Claim", pending);

    }

    function _createNotification(uint256 _poolId, address _user, string memory _typeOf, uint256 _amount)internal{
        notification.push(Notification({
            poolId:_poolId,
            amount:_amount,
            user:_user,
            typeOf:_typeOf,
            timestamp:block.timestamp
        }));
    }

    function getNotification() public view returns(Notification[] memory){
        return notification;
    }

}