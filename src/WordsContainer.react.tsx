import React from "react";
import { FormControl, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import "./App.css";

const words = [
    "accident", "accidentally", "actually", "actual", "address", "although", "answer", "appear", "arrive",
    "believe", "bicycle", "breath", "breathe", "build", "busy", "business",
    "calendar", "caught", "centre", "century", "certain", "circle", "consider", "continue",
    "decide", "describe", "different", "difficult", "disappear",
    "early", "earth", "eight", "eighth", "enough", "entrance", "exercise", "experience", "experiment", "extreme",
    "famous", "favourite", "february", "forward", "fruit", "grammar", "group", "guard", "guide",
    "heard", "heart", "height", "history",
    "imagine", "important", "increase", "interest", "island",
    "knowledge",
    "learn", "length", "library",
    "material", "medicine", "mention", "minute",
    "natural", "naughty", "notice",
    "occasion", "occasionally", "often", "opposite", "oridnary",
    "pearl", "particular", "peculiar", "perhaps", "popular", "position", "possess", "possession", "possible", "potatoes", "pressure", "probably", "promise", "purpose",
    "quarter", "question",
    "recent", "regular", "reign", "remember",
    "sentence", "separate", "special", "straight", "strange", "strength", "suppose", "surprise",
    "therefore", "though", "thought", "through",
    "various", "weight", "woman", "women"
];

function getRandomWord(): string {
    return words[Math.floor(Math.random() * words.length)];
}

function playWord(word: string): void {
    const msg = new SpeechSynthesisUtterance();
    msg.text = word;
    window.speechSynthesis.speak(msg);
}

export default function WordsContainer() {
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [typedWord, setTypedWord] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState(true);

    const onNextWordClick = useCallback(() => {
        const word = getRandomWord();
        setSelectedWord(word);
        setTypedWord("");
        setIsCorrect(false);

        playWord(word)
    }, []);

    const onRepeatWord = useCallback(() => {
        if (selectedWord != null) {
            playWord(selectedWord);
        }
    }, [selectedWord]);

    const onWordCheck = useCallback(async () => {
        const isCorrectLocal =
            typedWord.toLowerCase().trim() === selectedWord?.toLowerCase();
        const soundName = isCorrectLocal
            ? "https://mindskills.online/static/audio/audio_for_menar_games/sounds/success.mp3"
            : "https://mindskills.online/static/audio/audio_for_menar_games/sounds/error.mp3";
        const audio = new Audio(soundName);
        await audio.play();
        setIsCorrect(isCorrectLocal);
        alert(isCorrectLocal ? "Correct!" : "Not correct");


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
            {selectedWord != null && !isCorrect && (
                <form autoComplete="off" className="elements" onSubmit={onFormCheck}>
                    <FormControl sx={{ width: "15ch" }}>
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
                {selectedWord != null && !isCorrect && (
                    <Button
                        onClick={onWordCheck}
                        variant="contained"
                        color="success"
                        className="button"
                    >
                        Check
                    </Button>

                )}
                {selectedWord != null && !isCorrect && (
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
