// Year 4 words
const wordsYear4 = [
  "accident",
  "accidentally",
  "actually",
  "actual",
  "address",
  "although",
  "answer",
  "appear",
  "arrive",
  "believe",
  "bicycle",
  "breath",
  "breathe",
  "build",
  "busy",
  "business",
  "calendar",
  "caught",
  "centre",
  "century",
  "certain",
  "circle",
  "consider",
  "continue",
  "decide",
  "describe",
  "different",
  "difficult",
  "disappear",
  "early",
  "earth",
  "eight",
  "eighth",
  "enough",
  "entrance",
  "exercise",
  "experience",
  "experiment",
  "extreme",
  "famous",
  "favourite",
  "february",
  "forward",
  "fruit",
  "grammar",
  "group",
  "guard",
  "guide",
  "heard",
  "heart",
  "height",
  "history",
  "imagine",
  "important",
  "increase",
  "interest",
  "island",
  "knowledge",
  "learn",
  "length",
  "library",
  "material",
  "medicine",
  "mention",
  "minute",
  "natural",
  "naughty",
  "notice",
  "occasion",
  "occasionally",
  "often",
  "opposite",
  "oridnary",
  "pearl",
  "particular",
  "peculiar",
  "perhaps",
  "popular",
  "position",
  "possess",
  "possession",
  "possible",
  "potatoes",
  "pressure",
  "probably",
  "promise",
  "purpose",
  "quarter",
  "question",
  "recent",
  "regular",
  "reign",
  "remember",
  "sentence",
  "separate",
  "special",
  "straight",
  "strange",
  "strength",
  "suppose",
  "surprise",
  "therefore",
  "though",
  "thought",
  "through",
  "various",
  "weight",
  "woman",
  "women",
];

// Year 1 words
const wordsYear1 = [
  "the",
  "a",
  "do",
  "today",
  "of",
  "said",
  "says",
  "are",
  "were",
  "was",
  "is",
  "his",
  "has",
  "I",
  "we",
  "no",
  "go",
  "so",
  "by",
  "my",
  "here",
  "there",
  "where",
  "love",
  "come",
  "some",
  "one",
  "once",
  "ask",
  "pull",
  "full",
  "he",
  "me",
  "she",
  "house",
  "our",
  "friend",
  "school",
  "put",
  "push",
  "you",
  "your",
  "they",
  "be",
];

export enum Year {
  year1 = "year1",
  year4 = "year4",
}

const wordsMap: { [key: string]: string[] } = {
  year1: wordsYear1,
  year4: wordsYear4,
};

export class NextWordSelector {
  private words: string[];
  private selectedWord: string | null = null;
  constructor(year: string) {
    this.words = wordsMap[year];
  }

  randomWord(): string {
    this.selectedWord =
      this.words[Math.floor(Math.random() * this.words.length)];
    return this.selectedWord;
  }

  public get word(): string | null {
    return this.selectedWord;
  }

  nextWord(): string {
    if (this.selectedWord == null) {
      this.selectedWord = this.words[0];
      return this.selectedWord;
    }
    const currentIndex = this.words.indexOf(this.selectedWord);
    const nextIndex = (currentIndex + 1) % this.words.length;
    this.selectedWord = this.words[nextIndex];
    return this.selectedWord;
  }
}
