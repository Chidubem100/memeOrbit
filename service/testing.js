const { Withdrawal } = require("../models");

const createWithdrawal = async ({ 
    userId,
    amount,
    trxnId,
    status,
    method,
    euEquAmount,
    walletAdd,
}) => {
  try {
    const withdrawal = await Withdrawal.create({
      userId,
      amount,
      trxnId,
      status,
      method,
      euEquAmount,
      walletAdd    
    });
    return withdrawal;
  } catch (error) {
    throw new Error(`Error creating withdrawal: ${error.message}`);
  }
};

const findAllWithdrawal = async () => {
  try {
    const withdrawals = await Withdrawal.findAll({});
    return withdrawals;
  } catch (error) {
    throw new Error(`Error finding all withdrawals: ${error.message}`);
  }
};

const findWithdrawalById = async ({ id }) => {
  try {
    const withdrawal = await Withdrawal.findByPk(id);
    if (!withdrawal) throw new Error("Withdrawal not found");
    return withdrawal;
  } catch (error) {
    throw new Error(`Error finding withdrawal by ID: ${error.message}`);
  }
};

const findAllWithdrawalForUser = async ({ userId }) => {
  try {
    const withdrawals = await Withdrawal.findAll({ where: { userId } });
    return withdrawals;
  } catch (error) {
    throw new Error(`Error finding withdrawals for user: ${error.message}`);
  }
};

const findWithdrawalByTrxId = async ({ trxId }) => {
  try {
    const withdrawal = await Withdrawal.findOne({ where: { trxId } });
    if (!withdrawal) throw new Error("Withdrawal not found");
    return withdrawal;
  } catch (error) {
    throw new Error(`Error finding withdrawal by transaction ID: ${error.message}`);
  }
};

const findAllApprovedWithdrawal = async () => {
  try {
    const withdrawals = await Withdrawal.findAll({ where: { status: 'approved' } });
    return withdrawals;
  } catch (error) {
    throw new Error(`Error finding approved withdrawals: ${error.message}`);
  }
};

const findAllPendingWithdrawal = async () => {
  try {
    const withdrawals = await Withdrawal.findAll({ where: { status: 'pending' } });
    return withdrawals;
  } catch (error) {
    throw new Error(`Error finding pending withdrawals: ${error.message}`);
  }
};

module.exports = {
  createWithdrawal,
  findAllWithdrawal,
  findWithdrawalById,
  findAllWithdrawalForUser,
  findWithdrawalByTrxId,
  findAllApprovedWithdrawal,
  findAllPendingWithdrawal,
};
