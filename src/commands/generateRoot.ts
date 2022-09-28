import {Command, flags} from '@oclif/command'
import {readFileSync} from 'fs';
import {Airdrop, AirdropFile} from "../airdrop";

export default class GenerateRoot extends Command {
    static description = 'Generates merkle root'

    static examples = [
        `$ ./bin/run generateRoot --file ./testdata/airdrop_file.json
`,
    ]

    static flags = {
        help: flags.help({char: 'h'}),
        file: flags.string({char: 'f', description: 'Airdrop file location'}),
    }

    async run() {
        const {flags} = this.parse(GenerateRoot)

        if (!flags.file) {
            this.error(new Error('Airdrop file location not defined'))
        }

        let file;
        try {
            file = readFileSync(flags.file, 'utf-8');
        } catch (e) {
            this.error(e as Error)
        }

        let receivers: AirdropFile = JSON.parse(file);
        let airdrop = new Airdrop(receivers.values)
        console.log("Root Hash:", airdrop.getMerkleRoot());
    }
}
