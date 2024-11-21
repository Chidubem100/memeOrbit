const {Investment} = require("../models");

/**
 * Finds the most recent investment for a user.
 * @param {Object} params - The parameters for the query.
 * @param {string} params.userId - The user's ID.
 * @returns {Promise<Object|null>} - The most recent investment or null if none exist.
 */
const findMostRecentInvestment = async ({ userId }) => {
  try {
    // Query for the most recent investment by createdAt timestamp
    const recentInvestment = await Investment.findOne({
      where: { userId },
      order: [["createdAt", "DESC"]], // Orders by the most recent investment
    });

    return recentInvestment;
  } catch (error) {
    console.error("Error fetching most recent investment:", error.message);
    throw new Error("Unable to fetch most recent investment.");
  }
};


const createInvestment = async({userId, plans, amount, count, investmentId, investmentDate, status, returnOnInvestment}) =>{
    try {
        const investment = await Investment.create({
            userId, plans, amount, count, investmentId, investmentDate, status, returnOnInvestment
        });
        return investment;
    } catch (error) {
        throw new Error('Error occurred: ',error.message )
    }
}

const findAllInvestment = async({}) =>{
    try {
        const investment = await Investment.findAll({});
        return investment;
    } catch (error) {
        throw new Error('Error occurred!: ',error.message )
    }
}

const findInvestmentById = async({id}) =>{
    try {
        const investment = await Investment.findByPk(id);
        if(!investment) throw new Error("No Inestment");
        return investment;
    } catch (error) {
        throw new Error('Error occurred: ',error.message )
    }
}

const findAllInvestmentForUser = async({userId}) =>{
    try {
        const investment = await Investment.findAll({where: {userId}});
        return investment;
    } catch (error) {
        throw new Error('Error occurred: ',error.message )
    }
}

const findInvestmentByTrxId = async({investmentId}) =>{
    try {
        const investment = await Investment.findAll({where: {investmentId}});
        if(!investment) throw new Error("Investment Not Found");
        return investment;
    } catch (error) {
        throw new Error('Error occurred: ',error.message )
    }
}

const findAllOngoingInvestment = async() =>{
    try {
        const investment = await Investment.findAll({ where: { status: 'ongoing' }})
        return investment
    } catch (error) {
        throw new Error("Error Occurred: ", error.message)
    }
}

const findAllCompletedInvestment = async() =>{
    try {
        const investment = await Investment.findAll({ where: { status: 'completed' }})
        return investment
    } catch (error) {
        throw new Error("Error Occurred: ", error.message)
    }
}

module.exports = {
    findAllInvestment,
    findInvestmentById,
    findInvestmentByTrxId,
    createInvestment,
    findAllInvestmentForUser,
    findAllCompletedInvestment,
    findAllOngoingInvestment,
    findMostRecentInvestment
}