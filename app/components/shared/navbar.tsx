'use client';
import { useKanbanStore } from '@/lib/stores/kanban/store'
import { randomReadableName } from '@/lib/utils/random-name';
import { Avatar } from 'radix-ui';
import React from 'react'

const Navbar = () => {
  const user = useKanbanStore(state => state.user);
  const setUserName = useKanbanStore.setState;
  if (!user.name)
    setUserName(state => {
      state.user.name = randomReadableName()
    });

  return ( 
    <nav className="h-12 w-full px-12 flex items-center justify-end gap-3 border-b-1 border-gray-200 shadow-sm shadow-gray-300/50">
      {user.name && (
        <>
        <div className='italic text-sm text-gray-400'>Hi {user.name}!</div>
          <Avatar.Root className="inline-flex size-[24px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
            <Avatar.Image
              className="size-full rounded-[inherit] object-cover"
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              alt="Colm Tuite"
            />
            <Avatar.Fallback
              className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
              delayMs={600}
            >
              CT
            </Avatar.Fallback>
          </Avatar.Root>
        </>
      )}
    </nav>
  )
}

export default Navbar