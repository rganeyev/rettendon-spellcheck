import React from "react";
import { FormControl, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import "./App.css";
import { NextWordSelector, Year } from "./NextWordSelector";

function playWord(word: string): void {
    const msg = new SpeechSynthesisUtterance(word);
    window.speechSynthesis.speak(msg);
}

interface WordsContainerProps {
    year: Year;
}

export default function WordsContainer({ year }: WordsContainerProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selector, _setSelector] = useState(new NextWordSelector(year));

    const [typedWord, setTypedWord] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState(true);

    const onNextWordClick = useCallback(() => {
        const word = selector.nextWord();
        setTypedWord("");
        setIsCorrect(false);

        playWord(word)
    }, []);

    const onRepeatWord = useCallback(() => {
        if (selector.word != null) {
            playWord(selector.word);
        }
    }, [selector.word]);

    const onWordCheck = useCallback(async () => {
        const isCorrectLocal =
            typedWord.toLowerCase().trim() === selector.word?.toLowerCase();
        const soundName = isCorrectLocal
            ? `${process.env.PUBLIC_URL}/success.mp3`
            : `${process.env.PUBLIC_URL}/error.mp3`;
        const audio = new Audio(soundName);
        await audio.play();
        setIsCorrect(isCorrectLocal);
        alert(isCorrectLocal ? "Correct!" : "Not correct");


    }, [typedWord, selector.word]);

    const onFormCheck = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onWordCheck();
        },
        [onWordCheck]
    );

    return (
        <div>
            {selector.word != null && !isCorrect && (
                <form autoComplete="off" className="elements" onSubmit={onFormCheck}>
                    <FormControl sx={{ width: "15ch" }}>
                        <TextField
                            autoFocus
                            autoComplete="off"
                            id="standard-outlined"
                            color="warning"
                            label="Write your word here"
                            variant="outlined"
                            required={true}
                            focused={true}
                            value={typedWord}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTypedWord(event.target.value);
                            }}
                            sx={{ input: { color: "white" } }}
                        />
                    </FormControl>
                </form>
            )}
            <div className="buttons">
                {selector.word != null && !isCorrect && (
                    <Button
                        onClick={onWordCheck}
                        variant="contained"
                        color="success"
                        className="button"
                    >
                        Check
                    </Button>

                )}
                {selector.word != null && !isCorrect && (
                    <Button
                        onClick={onRepeatWord}
                        variant="contained"
                        color="error"
                        className="button"
                    >
                        Again
                    </Button>
                )}
                <Button
                    onClick={onNextWordClick}
                    variant="contained"
                    className="button"
                >
                    Next word
                </Button>
            </div>
        </div>
    );
}
