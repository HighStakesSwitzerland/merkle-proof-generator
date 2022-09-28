import {Command, flags} from '@oclif/command'
import {readFileSync} from 'fs';
import {Airdrop, AirdropFile} from '../airdrop';

export default class VerifyProof extends Command {
    static description = 'Verifies merkle proofs for given address'

    static examples = [
        `$ PROOFS='[ "a714186eaedddde26b08b9afda38cf62fdf88d68e3aa0d5a4b55033487fe14a1","fb57090a813128eeb953a4210dd64ee73d2632b8158231effe2f0a18b2d3b5dd","c30992d264c74c58b636a31098c6c27a5fc08b3f61b7eafe2a33dcb445822343"]'
     $ ./bin/run verifyProofs --file ./testdata/airdrop_file.json \
        --address wasm1k9hwzxs889jpvd7env8z49gad3a3633vg350tq \
        --amount 100
        --proofs $PROOFS
`,
    ]

    static flags = {
        help: flags.help({char: 'h'}),
        file: flags.string({char: 'f', description: 'airdrop file location'}),
        proofs: flags.string({char: 'p', description: 'proofs in json format'}),
        address: flags.string({char: 'a', description: 'address'}),
        amount: flags.string({char: 'b', description: 'amount'}),
    }

    async run() {
        const {flags} = this.parse(VerifyProof)

        if (!flags.file) {
            this.error(new Error('Airdrop file location not defined'))
        }
        if (!flags.proofs) {
            this.error(new Error('Proofs not defined'))
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
        } catch (e) {
            this.error(e as Error)
        }

        let receivers: AirdropFile = JSON.parse(file);
        let airdrop = new Airdrop(receivers.values)
        let proofs: string[] = JSON.parse(flags.proofs)

        console.log(airdrop.verify(proofs, {address: flags.address, amount: flags.amount}))
    }
}
