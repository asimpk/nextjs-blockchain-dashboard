'use client'

import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from './ui/button'

const Navbar: React.FC = () => {
  return (
    <section className="flex w-full justify-between">
      <Link href="/">
        <h2 className="text-2xl font-bold text-slate-700">Multichain Explorer</h2>
      </Link>
      <ConnectButton.Custom>
        {({ openConnectModal }) => <Button onClick={openConnectModal}>Sign In</Button>}
      </ConnectButton.Custom>
    </section>
  )
}
export default Navbar
