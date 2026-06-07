#[starknet::contract]
mod readiness_anchor {
    #[storage]
    struct Storage {}

    #[external(v0)]
    fn version(self: @ContractState) -> felt252 {
        'KARYRA_ALPHA_01'
    }

    #[external(v0)]
    fn purpose(self: @ContractState) -> felt252 {
        'READINESS_GATEWAY'
    }
}
