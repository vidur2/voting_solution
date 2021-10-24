const { stream } = require('got');
const file = stream("http://localhost:3000/voting_smart_contract_indiv.wasm")

async function check_info(ssn, firstname, lastname, birthday, street_address, zip_code, state){
    const prisma = require("../../../lib/prisma")
    const citizen = await prisma.default.citizen.findUnique({
        where: {
            ssn: ssn
        }
    })
    if (await citizen == null){
        return false
    }else if(firstname == await citizen.firstname && lastname == await citizen.lastname && birthday == await citizen.birthday && zip_code == await citizen.zip_code && street_address == await citizen.street_address && state == await citizen.state && citizen.account_id == ''){
        return true
        
    }else {
        return false;
        }
}

async function create_account(ssn){
    const { connect, keyStores, KeyPair } = require("near-api-js");
    const { parseSeedPhrase } = require("near-seed-phrase")
    const keyStore = new keyStores.InMemoryKeyStore();
    const master_key = parseSeedPhrase("sponsor void history sample recall soldier pet panel cotton paper enjoy decline ")
    const keyPair = KeyPair.fromString(master_key.secretKey)
    keyStore.setKey("testnet", "election.testnet", keyPair).then(() => {
        const config = {
            keyStore,
            networkId: "testnet",
            nodeUrl: "https://rpc.testnet.near.org"
        }
        connect({ ...config, keyStore }).then((near) => {
            const keyPair = KeyPair.fromRandom("ed25519");
            const publicKey = keyPair.publicKey.toString();
            const usableId = ssn.replace("-", "").replace("-", "")
            keyStore.setKey(config.networkId, usableId + ".election.testnet", keyPair)
            console.log(keyPair.publicKey.toString())
            near.account("election.testnet").then((creatorAccount) => {
                creatorAccount.createAccount(
                        usableId + ".election.testnet",
                        publicKey,
                        "2450000000000000000000",
                ).then(async() => {
                    creatorAccount.sendMoney(
                        usableId + ".election.testnet",
                        "17534947543149350000000000"
                    )
                })
            })
    })
    })
    return keyStore
    }
export default function handler(req, res) {
    if (req.method == 'POST'){
        const reqBody = JSON.parse(req.body)
        if(reqBody.type == "login"){
            check_info(reqBody.ssn, reqBody.firstname, reqBody.lastname, reqBody.birthday, reqBody.street_address, reqBody.zip_code, reqBody.state).then(async(value) => {
                if(value){
                    res.status(200).json({login_status: "Success"})
                }
                else{
                    res.status(400).json({login_status: "Failure"})
                }
            })
        }else if (reqBody.type == "vote"){
            console.log(req.body)
            vote(reqBody.person, reqBody.candidate, reqBody.keyStore);
            res.status(200).json({status: "Vote Successful!"})
        }else{
            res.status(400).json({status: "invalid request pattern"})
        }
  }
}