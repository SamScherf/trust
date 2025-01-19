import { Button, HTMLSelect } from '@blueprintjs/core';
import React from 'react';
import { getToaster } from '../util/toaster.ts';

interface GameConfigProps {
    startGame: () => void;
    onSavePlayerOne: (player: string) => void;
    onSavePlayerTwo: (player: string) => void;

}
export const GameConfig: React.FC<GameConfigProps> = ({ startGame, onSavePlayerOne, onSavePlayerTwo }) => {
    const players = ["Sam", "Ilan", "Chirs"]

    const [playerOne, setPlayerOne] = React.useState<string>(players[0]);
    const [playerTwo, setPlayerTwo] = React.useState<string>(players[0]);

    const handlePlayerOneSelect = React.useCallback((event) => setPlayerOne(event.currentTarget.value), [setPlayerOne]);
    const handlePlayerTwoSelect = React.useCallback((event) => setPlayerTwo(event.currentTarget.value), [setPlayerTwo]);
    const handleStart = React.useCallback(async () => {
        if (playerOne === playerTwo) {
            const toaster = await getToaster();
            toaster.show({intent: "warning", message: "You can't play a game against yourself. Why? Because I said so." })
            return
        } else {
            onSavePlayerOne(playerOne)
            onSavePlayerTwo(playerTwo)
            startGame();
        }
    }, [startGame, playerOne, playerTwo, onSavePlayerOne, onSavePlayerTwo]);
    return (
        <div className="pick-players">
            <div className="instructions">
                Pick your players
            </div>
            <div className="player-selection-container">
                <HTMLSelect options={players} fill={true} large={true} value={playerOne} onChange={handlePlayerOneSelect} />
                <HTMLSelect options={players} fill={true} large={true} value={playerTwo} onChange={handlePlayerTwoSelect} />
            </div>
            <Button text="Start" onClick={handleStart} intent="success" fill={true} />
        </div>
    )
}