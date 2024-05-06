'use strict'

const commands = process.argv.slice(2)
const Controller = require('./controllers/controller')
const cmd = commands[0]

switch (cmd) {
    case 'list': {
        Controller.list()
        break;
    }

    case 'addBank': {
        const bankName = commands[1]
        const bankType = commands[2]

        Controller.addBank(bankName, bankType)
        break;
    }

    case 'deleteBank': {
        const bankId = commands[1]
        Controller.deleteBank(Number(bankId))
        break;
    }

    case 'addCustomer': {
        const bankId = commands[1]
        const customerName = commands[2]
        const ktp = commands[3]
        const depositAmount = commands[4]
        Controller.addCustomer(Number(bankId), customerName, ktp, depositAmount)
        break;
    }

    case 'deleteCustomer': {
        const bankId = commands[1]
        const ktp = commands[2]
        Controller.deleteCustomer(Number(bankId), ktp)
        break;
    }

    case 'detail': {
        const bankId = commands[1]
        Controller.detail(Number(bankId))
        break;
    }

    default: {
        return
    }
}