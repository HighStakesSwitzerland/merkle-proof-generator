merkle-proof-generator
==================

## Installation

```shell
npm install
```

Compiled script will be placed to `./bin/run`

## Airdrop file format

```json
[
  { "address": "secret1k9hwzxs889jpvd7env8z49gad3a3633vg350tq", "amount": "100"},
  { "address": "secret1uy9ucvgerneekxpnfwyfnpxvlsx5dzdpf0mzjd", "amount": "1010"}
]
```

## Commands

**Generate Root:**
```shell
./bin/run generateRoot --file ../testdata/airdrop_stage_2_list.json
```

**Generate proof:**
```shell
./bin/run generateProofs --file ../testdata/airdrop_stage_2_list.json \
  --address secret1ylna88nach9sn5n7qe7u5l6lh7dmt6lp2y63xx \
  --amount 1000000000
```

**Verify proof:**
```shell
PROOFS='["a5587bd4d158618b83badf57b1a4206f86e33407e18797ef690c931d73b36232","b69c5239d434753af2f6c3eab47f4e78c436f862f14e6989be5c9027c2b6dfe2","6f8d13999fb20e16ad457cf43f07f0a0f91a4a330127dbc5abf11d73bd4bbd45"]'
./bin/run verifyProofs --file ./testdata/airdrop_stage_2_list.json \
  --address wasm1ylna88nach9sn5n7qe7u5l6lh7dmt6lp2y63xx \
  --amount 1000000000 \
  --proofs $PROOFS
```
