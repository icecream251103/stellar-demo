import StellarSdk from '@stellar/stellar-sdk';

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

async function fundAccount(publicKey) {
    console.log(`  Funding ${publicKey} via Friendbot...`);
    const res = await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`);
    const data = await res.json();
    if (data.status && data.status !== 200) {
        throw new Error(`Friendbot error: ${JSON.stringify(data)}`);
    }
    console.log(`  Done. Tx hash: ${data.hash}`);
}

async function checkBalance(label, publicKey) {
    const account = await server.loadAccount(publicKey);
    console.log(`\nBalance of ${label} (${publicKey}):`);
    account.balances.forEach((b) => {
        const asset = b.asset_type === 'native' ? 'XLM' : `${b.asset_code}/${b.asset_issuer}`;
        console.log(`  ${asset}: ${b.balance}`);
    });
}

async function sendPayment(sourceKeypair, destinationPublicKey, amount) {
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
    })
        .addOperation(
            StellarSdk.Operation.payment({
                destination: destinationPublicKey,
                asset: StellarSdk.Asset.native(),
                amount: amount,
            })
        )
        .setTimeout(30)
        .build();

    transaction.sign(sourceKeypair);
    const result = await server.submitTransaction(transaction);
    console.log(`  Transaction hash: ${result.hash}`);
    return result;
}

// ──────────────────────────────────────────────
// MAIN DEMO
// ──────────────────────────────────────────────
console.log('=== Stellar Testnet Demo ===\n');

// 1. Tạo 2 keypair
console.log('STEP 1: Generating keypairs...');
const accountA = StellarSdk.Keypair.random();
const accountB = StellarSdk.Keypair.random();
console.log('  Account A  Public :', accountA.publicKey());
console.log('  Account A  Secret :', accountA.secret());
console.log('  Account B  Public :', accountB.publicKey());
console.log('  Account B  Secret :', accountB.secret());

// 2. Fund cả 2 tài khoản bằng Friendbot
console.log('\nSTEP 2: Funding accounts via Friendbot...');
await fundAccount(accountA.publicKey());
await fundAccount(accountB.publicKey());

// 3. Kiểm tra số dư ban đầu
console.log('\nSTEP 3: Initial balances...');
await checkBalance('Account A', accountA.publicKey());
await checkBalance('Account B', accountB.publicKey());

// 4. Gửi 50 XLM từ A → B
console.log('\nSTEP 4: Sending 50 XLM from Account A → Account B...');
await sendPayment(accountA, accountB.publicKey(), '50');

// 5. Kiểm tra số dư sau giao dịch
console.log('\nSTEP 5: Balances after transfer...');
await checkBalance('Account A', accountA.publicKey());
await checkBalance('Account B', accountB.publicKey());

console.log('\n=== Demo completed successfully! ===');
