import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
    {
        question: 'What is the difference between inheritance and polymorphism',
        answer: 'Idk look it up'
    },
    {
        question: 'What is encapsulation in Java',
        answer: 'Idk look it up'
    },
    {
        question: 'What is the time complexity of inserting inside a LinkedList',
        answer: 'Idk look it up'
    },
    {
        question: 'Python or Java?',
        answer: 'VHDL is king'
    },
    {
        question: 'Sweet or Savoury?',
        answer: 'Sweet (I am a manchild)'
    }
]

function Quizz() {
    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
            Array(db.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < db.length - 1

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < db.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    // increase current index and show card
    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
    }

    return (
        <div className='mx-auto h-screen w-screen flex justify-center items-center relative'>
            <div className='relative'>
                <div className='relative mt-4 mx-4 h-full'>
                    {db.map((character, index) => (
                        <TinderCard
                            ref={childRefs[index]}
                            className='swipe'
                            key={character.question}
                            onSwipe={(dir) => swiped(dir, character.question, index)}
                            onCardLeftScreen={() => outOfFrame(character.question, index)}
                        >
                            <div className='absolute -bottom-4 scale-[0.85] origin-bottom inset-x-0 h-[300px] w-[600px] mx-[-240px] backdrop-blur-md rounded-2xl bg-[#66b2ff] align-middle text-center'>
                                <h3 className='text-white text-2xl my-[20%]'>{character.question}</h3>
                            </div>
                        </TinderCard>
                    ))}
                </div>
            </div>
            <div className='relative top-[15%] text-white space-x-10'>
                {/* <button className='bg-[#ff8566] p-[20px] rounded-lg' onClick={() => swipe('left')}>Wrong!</button> */}
                <button className='p-[20px] rounded-lg bg-yellow-300' onClick={() => goBack()}>Go back</button>
                {/* <button className='bg-[#5aff91] p-[20px] rounded-lg' onClick={() => swipe('right')}>Correct!</button> */}
            </div>
            {/* {lastDirection ? (
                <h2 key={lastDirection} className='infoText'>
                    {lastDirection}
                </h2>
            ) : (
                <h2 className='infoText'>
                    Swipe a card or press a button to get Restore Card button visible!
                </h2>
            )} */}
        </div>
    )
}

export default Quizz