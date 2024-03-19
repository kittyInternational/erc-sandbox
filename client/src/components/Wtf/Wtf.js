
const etherscanUrl = `https://etherscan.io/address/0x91047abf3cab8da5a9515c8750ab33b4f1560a7a`
const openseaUrl = 'https://opensea.io/collection/chainfaces'
const ercSandboxUrl = 'https://github.com/kittyinternational/erc-sandbox'
const kiUrl = 'https://kitty.international'


const Wtf = () => {
    return (
        <>
            <p><a href={etherscanUrl} target={'_blank'} rel={'noreferrer'}>Released in 2020</a> by NateAlex</p>
            <p>Available for purchase on <a href={openseaUrl} target={'_blank'} rel={'noreferrer'}>Opensea</a></p>
            <p>Dapp created using the <a href={ercSandboxUrl} target={'_blank'} rel={'noreferrer'}>ERC Sandbox</a> by <a href={kiUrl} target={'_blank'} rel={'noreferrer'}>kitty.international</a></p>
        </>
        
    )
}

export default Wtf