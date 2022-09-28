import {Command, flags} from '@oclif/command'
import {readFileSync} from 'fs';
import {Airdrop, AirdropFile} from "../airdrop";

export default class GenerateProofs extends Command {
    static description = 'Generates merkle proofs for given address'

    static examples = [
        `$ ./bin/run generateProofs --file ./testdata/airdrop_file.json \
        --address wasm1k9hwzxs889jpvd7env8z49gad3a3633vg350tq \
        --amount 100
`,
    ]

    static flags = {
        help: flags.help({char: 'h'}),
        file: flags.string({char: 'f', description: 'airdrop file location'}),
        address: flags.string({char: 'a', description: 'address'}),
        amount: flags.string({char: 'b', description: 'amount'}),
    }

    async run() {
        const {flags} = this.parse(GenerateProofs)

        if (!flags.file) {
            this.error(new Error('Airdrop file location not defined'))
        }
        if (!flags.address) {
            this.error(new Error('Address not defined'))
        }
        if (!flags.amount) {
            this.error(new Error('Amount not defined'))
        }

        let file;
        try {
            file = readFileSync(flags.file, 'utf-8');
        } catch (error) {
            this.error(error as Error)
        }

        let receivers: AirdropFile = JSON.parse(file);
        let airdrop = new Airdrop(receivers.values)
        let proof = airdrop.getMerkleProof({address: flags.address, amount: flags.amount})
        console.log(JSON.stringify(proof))
    }
}
