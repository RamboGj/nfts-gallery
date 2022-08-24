import { useState } from "react"

export default function Home() {
  const [nftsList, setNftsList] = useState([])
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [collectionAddress, setCollectionAddress] = useState<string>('')
  const [isFetchForCollection, setIsFetchForCollection] = useState<boolean>(false)

  async function fetchNfts() {
    let nfts
    console.log("fetching nfts...")

    const baseUrl = `https://polygon-mumbai.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTs`

    if (collectionAddress === '') {

      const fetchUrl = `${baseUrl}?owner=${walletAddress}`

      nfts = await fetch(fetchUrl, { method: 'GET'})
      .then(data => data.json())

      if (nfts) {
        console.log(nfts)
        setNftsList(nfts.ownedNfts)
      }

    } else {
      const fetchUrl = `${baseUrl}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`

      console.log("fetching nfts for collecction owne by address...")
      
      nfts = await fetch(fetchUrl, { method: 'GET'})
      .then(data => data.json())

      if (nfts) {
        console.log(nfts)
        setNftsList(nfts.ownedNfts)
      }
    }
  }

  async function fetchNFTsForCollection() {
    let nfts
    console.log("fetching for collection...")

    if (collectionAddress.length) {
      const baseUrl = `https://polygon-mumbai.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_API_KEY}/getNFTsForCollection`
      const fetchUrl = `${baseUrl}?contractAddress=${collectionAddress}&withMetadata=true`
      
      nfts = await fetch(fetchUrl, { method: 'GET'})
      .then(data => data.json())

      if (nfts) {
        console.log("Nfts in collection: ", nfts)
      }
    }
  }


  return (
    <div className="flex min-h-screen py-2 mx-auto justify-center">
      <div className="flex flex-col max-w-[380px] gap-y-4 justify-start mx-auto mt-24">
        <input
          className="py-3 px-6 w-[300px] rounded-md shadow-xl border-2 border-transparent focus:outline-none focus:border-green-300 transition duration-300"
          value={walletAddress} 
          onChange={(e) => setWalletAddress(e.target.value)}
          type="text" 
          placeholder="Your wallet address..." 
        />
        <input 
          className="py-3 px-6 w-[300px] rounded-md shadow-xl border-2 border-transparent focus:outline-none focus:border-green-300 transition duration-300"
          value={collectionAddress} 
          onChange={(e) => setCollectionAddress(e.target.value)}
          type="text" 
          placeholder="Collection address..."
        />
        <div className="flex items-center justify-center">
          <label>
            <input 
              className="w-[16px] h-[16px] rounded-md mr-2"
              onChange={(e) => setIsFetchForCollection(e.target.checked)}
              type="checkbox" 
            />
            Fetch for collection
          </label>
        </div>
        <button
          className="mt-4 w-[300px] py-3 px-6 bg-green-500 rounded-md font-bold text-green-100 hover:bg-green-700 transtion duration-500" 
          onClick={() => {
            if (isFetchForCollection) {
              fetchNFTsForCollection()
            } else {
              fetchNfts()
            }
          }}>
          Search
        </button>
      </div>
    </div>
  )
}


