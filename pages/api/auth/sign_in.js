const { readFileSync } = require('fs');
const { join } = require("path")
const file = readFileSync(join(__dirname, 'config', 'voting_smart_contract_indiv.wasm'))

async function check_info(ssn, firstname, lastname, birthday, street_address, zip_code, state){
    const prisma = require("../../../lib/prisma")
    const citizen = await prisma.default.citizen.findUnique({
        where: {
            ssn: ssn
        },
        select: {
            firstname: true,
            lastname: true,
            birthday: true,
            street_address: true, 
            zip_code: true,
            state: true
        }
    })
    if(firstname == await citizen.firstname && lastname == await citizen.lastname && birthday == await citizen.birthday && zip_code == await citizen.zip_code && street_address == await citizen.street_address && state == await citizen.state){
        create_account(ssn).then(async (value) => {
            await prisma.default.citizen.update({
                where: {
                    ssn: ssn
                },
                data: {
                    account_id: ssn + ".election.testnet",
                    access_key: value
                }
            })
        })
        return true;
    } else {
        return false;
    }
}
async function create_account(ssn){
    const { connect, KeyPairEd25519, keyStores, utils } = require("near-api-js");
    const { parseSeedPhrase } = require("near-seed-phrase")
    const keyStore = keyStores.InMemoryKeyStore();
    const master_key = parseSeedPhrase("sponsor void history sample recall soldier pet panel cotton paper enjoy decline ")
    const keyPair = keyPair.fromString(master_key)
    keyStore.setKey("testnet", "election.testnet", master_key).then(() => {
        const config = {
            keyStore,
            networkId: "testnet",
            nodeUrl: "https://rpc.testnet.near.org"
        }
        const near = connect({ ...config, keyStore }).then(async(near) => {
            const creatorAccount = await near.account("election.testnet");
        const keyPair = KeyPairEd25519.fromRandom("ed25519");
        const publicKey = keyPair.publicKey.toString();
        keyStore.setKey(config.networkId, ssn + ".election.testnet", keyPair)
        creatorAccount.functionCall({
            contractId: "testnet",
            methodName: "create_account",
            args: {
                new_account_id: ssn + ".election.testnet",
                new_public_key: publicKey
            },
            gas: "300000000000000",
            attachedDeposit: utils.format.parseNearAmount(0)
        }).then(() => {
            return keyPair.secretKey
        })
        });
    })
}
export default function handler(req, res) {
    if (req.method == 'POST'){
        const reqBody = JSON.parse(req.body)
        if(check_info(reqBody.ssn, reqBody.firstname, reqBody.lastname, reqBody.birthday, reqBody.street_address, reqBody.zip_code, reqBody.state )){
            res.status(200).json({login_status: "Success"})
        }
    }else{
        res.status(400).json({login_status: "Failure"})
    }
  }