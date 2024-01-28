import React from "react";
import { FormControl, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import "./App.css";

const words = ["accident", "accidentally", "actually", "actual", "arrive", "although", "build", "breath", "breathe", "calendar", "early", "extreme", "entrance", "pearl", "various", "reign"];
function getRandomWord(): string {
    return words[Math.floor(Math.random() * words.length)];
}

export default function WordsContainer() {
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [typedWord, setTypedWord] = useState<string>("");

    const onButtonClick = useCallback(() => {
        var word = getRandomWord();
        setSelectedWord(word);
        setTypedWord("");

        var msg = new SpeechSynthesisUtterance();
        msg.text = word;
        window.speechSynthesis.speak(msg);
    }, []);

    const onWordCheck = useCallback(async () => {
        const isCorrect = typedWord.toLowerCase().trim() === selectedWord?.toLowerCase();
        const soundName = isCorrect ? "https://mindskills.online/static/audio/audio_for_menar_games/sounds/success.mp3" : "https://mindskills.online/static/audio/audio_for_menar_games/sounds/error.mp3";
        const audio = new Audio(soundName);
        await audio.play();
        alert(isCorrect ? "Correct!" : "Not correct");

        setTypedWord("");
    }, [typedWord, selectedWord]);

    const onFormCheck = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onWordCheck();
        },
        [onWordCheck]
    );

    return (
        <div>
            {selectedWord != null && (
                <form
                    autoComplete="off"
                    className="elements"
                    onSubmit={onFormCheck}
                >
                    <FormControl sx={{ width: '15ch' }}>
                        <TextField
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
                {selectedWord != null && (
                    <Button
                        onClick={onWordCheck}
                        variant="contained"
                        color="success"
                        className="button"
                    >
                        Check
                    </Button>
                )}
                <Button onClick={onButtonClick} variant="contained" className="button">
                    Next word
                </Button>
            </div>
        </div>
    );
}
