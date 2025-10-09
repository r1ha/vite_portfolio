import React from 'react'

// Reusable skill icon component.
// Props:
// - src: path to svg (public/icons/...)
// - label: short label shown as visually-hidden text and tooltip
// - detail: optional longer text shown in tooltip on hover
// - size: pixel size (default 56)
export default function SkillIcon({ src, label, size = 56, showLabelOnHover = true }){
  const imgStyle = {
    width: size,
    height: size,
    willChange: 'transform',
  }

  return (
    <div className="relative flex flex-col items-center group">
      <button
        type="button"
        aria-label={label}
        title={label}
        className="rounded p-1 bg-transparent focus:outline-none"
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {src ? (
          <img
            src={src}
            alt={label}
            style={imgStyle}
            className="transform transition-transform duration-300 ease-out group-hover:scale-110 group-focus:scale-110"
          />
        ) : (
          // fallback circular placeholder
          <div style={{ width: size, height: size, borderRadius: '9999px', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{label[0]}</div>
        )}
      </button>

      {/* label shown on hover (or focus) */}
      {showLabelOnHover ? (
        <div className="text-xs mt-2 text-neutral-700 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
          {label}
        </div>
      ) : null}
    </div>
  )
}