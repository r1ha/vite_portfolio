import React from 'react'

// Simple responsive timeline component.
export default function Timeline({ items = [] }){
  return (
    <div className="mt-4">
      <div className="relative">
        {/* vertical line for timeline */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-400 hidden sm:block" />

        <ul className="space-y-6 sm:pl-12">
          {items.map(item => (
            <li key={item.id} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 text-black flex items-center justify-center text-sm">{item.year}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">{item.title}</div>
                  {item.subtitle && <div className="text-xs text-neutral-600 mt-1">{item.subtitle}</div>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
