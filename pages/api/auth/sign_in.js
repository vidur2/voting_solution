const { readFileSync } = require('fs');
const { join } = require("path")
const file = readFileSync(join(__dirname, 'voting_smart_contract_indiv.wasm'))

async function check_info(ssn, firstname, lastname, birthday, street_address, zip_code, state){
    const prisma = require("../../../lib/prisma")
    const citizen = await prisma.default.citizen.findUnique({
        where: {
            ssn: ssn
        }
    })
    if (await citizen == null){
        return false
    }else if(firstname == await citizen.firstname && lastname == await citizen.lastname && birthday == await citizen.birthday && zip_code == await citizen.zip_code && street_address == await citizen.street_address && state == await citizen.state){
        create_account(ssn).then(async(value) => {
            await prisma.default.citizen.update({
                where: {
                    ssn: ssn
                },
                data: {
                    account_id: ssn.replace("-", "").replace("-", "") + ".election.testnet",
                    access_key: value.secretKey
                }
            })
        })
        
        return true, value;
    }else {
            return false, null;
        }
}

async function vote(id, candidate, keyStore){
    const { connect, nearAPI } = require("near-api-js");
    const config = {
        keyStore,
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org"
    }
    connect({ ...config, keyStore }).then((near) => {
        near.account(id + ".election.testnet").then(async (voterAccount) => {
            const contract = new nearAPI.Contract(
                voterAccount,
                id + "election.testnet",
                {
                    changeMethods: ["vote_for_person"],
                    sender: voterAccount
                }
            );
            await contract.vote_for_person(
                {
                    person: candidate
                },
                300000000000000
            )
        })
    })
}
async function create_account(ssn){
    const { connect, keyStores, KeyPair } = require("near-api-js");
    const { parseSeedPhrase } = require("near-seed-phrase")
    const keyStore = new keyStores.InMemoryKeyStore();
    const master_key = parseSeedPhrase("sponsor void history sample recall soldier pet panel cotton paper enjoy decline ")
    const keyPair = KeyPair.fromString(master_key.secretKey)
    keyStore.setKey("testnet", "election.testnet", keyPair).then(async() => {
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
                        "1820000000000000000000",
                ).then(() => {
                    creatorAccount.sendMoney(
                        usableId + ".election.testnet",
                        "17534947543149350000000000"
                    )
                    near.account(usableId + ".election.testnet").then(async (account) => {
                        const response = await account.deployContract(file)
                        console.log(response)
                    })
                    console.log(keyStore)
                    return keyStore
                })
            })
    })
    })
    }
export default function handler(req, res) {
    if (req.method == 'POST'){
        const reqBody = JSON.parse(req.body)
        let is_valid;
        let keys;
        if(reqBody.type == "login"){
            check_info(reqBody.ssn, reqBody.firstname, reqBody.lastname, reqBody.birthday, reqBody.street_address, reqBody.zip_code, reqBody.state).then((is_valid, keys) => {
                console.log(keys)
                if(is_valid){
                    res.status(200).json({login_status: "Creation Success", keyStore: keys})
                }
                else{
                    res.status(400).json({login_status: "Failure"})
                }
            })
        }else if (reqBody.type == "vote"){
            vote(reqBody.person, reqBody.candidate, reqBody.keys);
            res.status(200).json({status: "Vote Successful!"})
        }
  }
}