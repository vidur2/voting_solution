use near_sdk::{near_bindgen, env, ext_contract, Gas, Balance, AccountId, Promise};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use std::f32::consts::E;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Default)]
pub struct Election {
    candidate1: String,
    candidate1_count: u128,
    candidate2: String,
    candidate2_count: u128,
    candidate3: String,
    candidate3_count: u128
}

#[near_bindgen]
impl Election {
    #[init]
    pub fn new(candidate1: String, candidate2: String, candidate3: String) -> Self{
        Self {
            candidate1: candidate1,
            candidate1_count: 0u128,
            candidate2: candidate2,
            candidate2_count: 0u128,
            candidate3: candidate3,
            candidate3_count: 0u128,
        }
    }

    pub fn vote(&mut self, candidate: String, has_voted: bool){
        let voter_id: String = env::predecessor_account_id();
        if candidate == self.candidate1 && has_voted == false{self.candidate1_count = self.candidate1_count + 1u128}
        else if candidate == self.candidate2 && has_voted == false{self.candidate2_count = self.candidate2_count + 1u128}
        else if candidate == self.candidate3 && has_voted == false{self.candidate3_count = self.candidate3_count + 1u128};
    }

    pub fn get_count(&self, candidate: String) -> u128{
        if candidate == self.candidate1{return self.candidate1_count}
        else if candidate == self.candidate2{return self.candidate2_count}
        else if candidate == self.candidate3{return self.candidate3_count}
        else{return 0u128}
    }
}