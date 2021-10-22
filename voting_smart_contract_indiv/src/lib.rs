use near_sdk::{near_bindgen, env, ext_contract, Gas, Balance, AccountId, Promise};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};

const BASE_GAS: u64 = 5_000_000_000_000;
const NO_DEPOSIT: Balance = 0;
const ELECTION_ID: &str = "election.testnet";

#[ext_contract(election_smart_contract)]
pub trait Election{
    fn vote(&mut self, candidate: String, has_voted: bool);
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Default)]
pub struct IndivididualVote {
    has_voted: bool
}

#[near_bindgen]
impl IndivididualVote{
    #[init]
    pub fn new() -> Self{
        Self {
            has_voted: false
        }
    }

    #[private]
    pub fn vote_for_person(&mut self, person: String){
        if !self.has_voted{
            let gas_count = Gas::from(BASE_GAS);
            let election_account_id: AccountId = ELECTION_ID.trim().parse().expect("invalid constant");
            election_smart_contract::vote(person, self.has_voted, election_account_id, NO_DEPOSIT, gas_count);
            self.has_voted = true;
        }
    }

    pub fn has_voted(&self) -> bool{
        self.has_voted
    }
}
