'use strict'

class View {

    static printError(error) {
        console.log(error.message);
    }

    static read(data) {
        console.log(data)
    }

    static successAddBank(data) {
        console.log(`Bank ${data.name} added successfully`);
    }

    static successDelete(data) {
        console.log(`Bank with name ${data.name} deleted successfully`);
    }

    static customerAdded(data) {
        console.log(`Customer ${data.name} added successfully`);
    }

    static custDelete(data) {
        console.log(`Customer with name ${data.name} deleted successfully`);
    }

    static detail(data) {
        let newData = data.map((el) => {
            return {name : el.name, ktp : el.ktp, depositAmount : el.depositAmount}
        })
        console.table(newData)
    }
}

module.exports = View