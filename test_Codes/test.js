
async function test(x) {
    return new Promise((resolve, reject) => {
        if (x > 10)
            resolve(true)
        else
            reject(false)
    })
}

async function main() {
    try {
        console.log('[+] started..');
        data = await test(parseInt(process.argv[2]))
        console.log(`[+] data`, { data });
        console.log('[+] done..');
    } catch (error) {
        console.log(`[-] data`, { error });
    }
}


main()
