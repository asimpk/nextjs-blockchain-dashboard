'use client'
import React, { useEffect, useState } from 'react'
import BlockDataTable from './BlockDataTable'
import TransactionsDataTable from './TransactionsDataTable'
import { useBlock } from 'wagmi'
import { Block } from 'viem'
import { fetchLastNData } from '@/services'
import { blockTabCol } from '@/lib/blockTabCol'
import { transactionsTabCol } from '@/lib/transactionsTabCol'

const Content: React.FC = () => {
  const [blockData, setBlockData] = useState<Block[]>([])
  const {
    data: block,
    isLoading,
    isError,
  } = useBlock({
    includeTransactions: true,
  })

  useEffect(() => {
    fetchLastNData(Number(block?.number), 30, 'block')
      .then((blocks) => {
        if (blocks) {
          const modBlock = blocks as unknown as Block[]
          setBlockData(modBlock)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [block?.number])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{isError}</div>

  return (
    <section className="flex w-full flex-col justify-between overflow-hidden md:flex-row">
      <div className="p-4 md:w-1/2">
        <BlockDataTable columns={blockTabCol} data={blockData} />
      </div>
      <div className="p-4 md:w-1/2">
        <TransactionsDataTable columns={transactionsTabCol} data={block?.transactions || []} />
      </div>
    </section>
  )
}

export default Content
