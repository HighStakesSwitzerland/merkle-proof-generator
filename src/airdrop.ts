import sha256 from 'crypto-js/sha256'
import { MerkleTree } from 'merkletreejs';

class Airdrop {
    private tree: MerkleTree;

    constructor(accounts: Array<{ address: string; amount: string }>) {
        const leaves = accounts.map((a) => {
            let sha = sha256(a.address + a.amount);
            console.log(`${a.address}:${sha}`)
            return sha;
        });
        this.tree = new MerkleTree(leaves, sha256, { sort: true });
    }

    public getMerkleRoot(): string {
        return this.tree.getHexRoot().replace('0x', '');
    }

    public getMerkleProof(account: {
        address: string;
        amount: string;
    }): string[] {
        return this.tree
            .getHexProof(sha256(account.address + account.amount).toString())
            .map((v) => v.replace('0x', ''));
    }

    public verify(
        proof: string[],
        account: { address: string; amount: string }
    ): boolean {
        console.log("account", account.address, "amount", account.amount)
        let sha = sha256(account.address + account.amount).toString();

        console.log("Root:", this.getMerkleRoot())
        return this.tree.verify(proof, sha, this.getMerkleRoot());
    }
}

export {Airdrop}
