import React from "react";
import { FormControl, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import "./App.css";

const words = ["hello", "world"];
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

    const onWordCheck = useCallback(() => {
        console.log(typedWord, selectedWord, typedWord === selectedWord);
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
                            id="standard-basic"
                            label="Write your word here"
                            variant="outlined"
                            required={true}
                            focused={true}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTypedWord(event.target.value);
                            }}
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
