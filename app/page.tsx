'use client'
import { useEffect, useRef, useState } from 'react'
import { animate, createScope, spring, createDraggable } from 'animejs'
// import reactLogo from './assets/react.svg';

import ClippyWrapper from './components/clippy-wrapper'

import './globals.scss'

export default function Home() {
  const root = useRef(null)
  const scope = useRef(null)
  const [rotations, setRotations] = useState(0)

  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      // Every anime.js instance declared here is now scoped to <div ref={root}>

      // Created a bounce animation loop
      animate('.chrome-text', {
        scale: [
          { to: 1.25, ease: 'inOut(3)', duration: 200 },
          { to: 1, ease: spring({ bounce: 0.7 }) },
        ],
        loop: true,
        loopDelay: 250,
      })

      // Make the logo draggable around its center
      createDraggable('.chrome-text', {
        container: [0, 0, 0, 0],
        releaseEase: spring({ bounce: 0.7 }),
      })

      // Register function methods to be used outside the useEffect
      self?.add('rotateLogo', (i) => {
        animate('.chrome-text', {
          rotate: i * 360,
          ease: 'out(4)',
          duration: 1500,
        })
      })
    })

    // Properly cleanup all anime.js instances declared inside the scope
    return () => scope.current.revert()
  }, [])

  const handleClick = () => {
    setRotations((prev) => {
      const newRotations = prev + 1
      // Animate logo rotation on click using the method declared inside the scope
      scope.current.methods.rotateLogo(newRotations)
      return newRotations
    })
  }

  return (
    <div className="home" ref={root}>
      <fieldset className="controls">
        <div className="chrome-container">
          <button onClick={handleClick}>
            <h1 className="chrome-text">rotations: {rotations}</h1>
          </button>
        </div>
      </fieldset>
    </div>
  )
}
