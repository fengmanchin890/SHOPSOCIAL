"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface NFTProduct {
  id: string
  tokenId: string
  contractAddress: string
  name: string
  description: string
  image: string
  price: number
  creator: string
  owner: string
  metadata: Record<string, any>
  verified: boolean
}

interface CryptocurrencyWallet {
  address: string
  balance: Record<string, number>
  network: string
  connected: boolean
}

interface SmartContract {
  address: string
  abi: any[]
  network: string
  type: "marketplace" | "nft" | "payment" | "loyalty"
}

interface BlockchainTransaction {
  hash: string
  from: string
  to: string
  value: number
  currency: string
  status: "pending" | "confirmed" | "failed"
  timestamp: number
  gasUsed?: number
  blockNumber?: number
}

interface BlockchainContextType {
  wallet: CryptocurrencyWallet | null
  nftProducts: NFTProduct[]
  transactions: BlockchainTransaction[]
  supportedCurrencies: string[]
  connectWallet: (provider: "metamask" | "walletconnect" | "coinbase") => Promise<boolean>
  disconnectWallet: () => void
  purchaseWithCrypto: (productId: string, currency: string) => Promise<string>
  mintNFT: (productData: any) => Promise<string>
  verifyProductAuthenticity: (productId: string) => Promise<boolean>
  getTransactionHistory: () => BlockchainTransaction[]
  estimateGasFee: (transaction: any) => Promise<number>
  isWalletConnected: boolean
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined)

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<CryptocurrencyWallet | null>(null)
  const [nftProducts, setNftProducts] = useState<NFTProduct[]>([
    {
      id: "nft-1",
      tokenId: "1001",
      contractAddress: "0x1234...abcd",
      name: "限量版數位時尚外套",
      description: "獨一無二的數位時尚NFT，可在虛擬世界中穿戴",
      image: "/placeholder.svg?height=400&width=400",
      price: 0.5,
      creator: "DigitalFashion Studio",
      owner: "0x5678...efgh",
      metadata: {
        rarity: "legendary",
        attributes: ["glow", "animated", "limited_edition"],
        utility: ["metaverse_wearable", "ar_filter"],
      },
      verified: true,
    },
    {
      id: "nft-2",
      tokenId: "1002",
      contractAddress: "0x1234...abcd",
      name: "虛擬藝術收藏品",
      description: "知名數位藝術家創作的限量收藏品",
      image: "/placeholder.svg?height=400&width=400",
      price: 1.2,
      creator: "CryptoArtist",
      owner: "0x9abc...defg",
      metadata: {
        rarity: "rare",
        attributes: ["animated", "interactive", "sound"],
        utility: ["display", "social_status"],
      },
      verified: true,
    },
  ])
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [supportedCurrencies] = useState(["ETH", "BTC", "USDC", "USDT", "BNB"])

  const connectWallet = async (provider: "metamask" | "walletconnect" | "coinbase"): Promise<boolean> => {
    try {
      // 模擬錢包連接
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockWallet: CryptocurrencyWallet = {
        address: "0x1234567890abcdef1234567890abcdef12345678",
        balance: {
          ETH: 2.5,
          BTC: 0.1,
          USDC: 1000,
          USDT: 500,
          BNB: 10,
        },
        network: "ethereum",
        connected: true,
      }

      setWallet(mockWallet)
      return true
    } catch (error) {
      console.error("錢包連接失敗:", error)
      return false
    }
  }

  const disconnectWallet = () => {
    setWallet(null)
  }

  const purchaseWithCrypto = async (productId: string, currency: string): Promise<string> => {
    if (!wallet) throw new Error("請先連接錢包")

    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`

    const transaction: BlockchainTransaction = {
      hash: transactionHash,
      from: wallet.address,
      to: "0xshop...address",
      value: 0.1, // 模擬價格
      currency,
      status: "pending",
      timestamp: Date.now(),
    }

    setTransactions((prev) => [transaction, ...prev])

    // 模擬交易確認
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.hash === transactionHash ? { ...tx, status: "confirmed", blockNumber: 12345678, gasUsed: 21000 } : tx,
        ),
      )
    }, 5000)

    return transactionHash
  }

  const mintNFT = async (productData: any): Promise<string> => {
    if (!wallet) throw new Error("請先連接錢包")

    const tokenId = `${Date.now()}`
    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`

    const newNFT: NFTProduct = {
      id: `nft-${tokenId}`,
      tokenId,
      contractAddress: "0x1234...abcd",
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
      creator: wallet.address,
      owner: wallet.address,
      metadata: productData.metadata || {},
      verified: false,
    }

    setNftProducts((prev) => [newNFT, ...prev])

    const transaction: BlockchainTransaction = {
      hash: transactionHash,
      from: wallet.address,
      to: "0x1234...abcd",
      value: 0.01, // Gas fee
      currency: "ETH",
      status: "pending",
      timestamp: Date.now(),
    }

    setTransactions((prev) => [transaction, ...prev])

    return transactionHash
  }

  const verifyProductAuthenticity = async (productId: string): Promise<boolean> => {
    // 模擬區塊鏈驗證
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return Math.random() > 0.1 // 90% 驗證成功率
  }

  const getTransactionHistory = (): BlockchainTransaction[] => {
    return transactions
  }

  const estimateGasFee = async (transaction: any): Promise<number> => {
    // 模擬 Gas 費用估算
    await new Promise((resolve) => setTimeout(resolve, 500))
    return Math.random() * 0.01 + 0.005 // 0.005-0.015 ETH
  }

  return (
    <BlockchainContext.Provider
      value={{
        wallet,
        nftProducts,
        transactions,
        supportedCurrencies,
        connectWallet,
        disconnectWallet,
        purchaseWithCrypto,
        mintNFT,
        verifyProductAuthenticity,
        getTransactionHistory,
        estimateGasFee,
        isWalletConnected: !!wallet?.connected,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  )
}

export function useBlockchain() {
  const context = useContext(BlockchainContext)
  if (context === undefined) {
    throw new Error("useBlockchain must be used within a BlockchainProvider")
  }
  return context
}
