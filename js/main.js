const languages = {
    uz: "Uzbek",
    en: "English",
    ru: "Russian",
    tr: "Turkish",
    de: "German",
    es: "Spanish",
    ar: "Arabic",
    fr: "French",
    it: "Italian",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    hi: "Hindi",
    pt: "Portuguese",
    pl: "Polish",
}

//select
const firstLanguage = document.getElementById("firstLanguage")
const secondLanguage = document.getElementById("secondLanguage")

//text area
const sourceText = document.getElementById("sourceText")
const translatedText = document.getElementById("translatedText")

const translateBtn = document.getElementById("translateBtn")
const copyBtn = document.getElementById("copyBtn")
const loading = document.getElementById("loading")
const mode = document.getElementById("mode")
const volumeBtn = document.getElementById("volumeBtn")

mode.addEventListener("click", () => {
    let body = document.querySelector("body")
    if (mode.classList.contains("bx-moon")) {
        mode.classList.remove("bx-moon")
        mode.classList.add("bx-sun")
        body.style.backgroundColor = "#1a202c"
        firstLanguage.style.color = "#005525"
        secondLanguage.style.color = "#005525"
        sourceText.style.color = ""
        translatedText.style.color = ""
        copyBtn.style.color = ""
    } else {
        mode.classList.remove("bx-sun")
        mode.classList.add("bx-moon")
        body.style.backgroundColor = "white"
        firstLanguage.style.color = "#005525"
        secondLanguage.style.color = "#005525"
        sourceText.style.color = "#005525"
        translatedText.style.color = "#005525"
        copyBtn.style.color = "#005525"
    }
})

Object.keys(languages).forEach((key) => {
    const option = document.createElement("option")
    option.value = key
    option.innerText = languages[key]
    firstLanguage.append(option)
})

Object.keys(languages).forEach((key) => {
    const option = document.createElement("option")
    option.value = key
    option.innerText = languages[key]
    secondLanguage.append(option)
})

firstLanguage.value = "uz"
secondLanguage.value = "en"

translateBtn.addEventListener("click", () => {
    translatedText.value = ""
    if (sourceText.value.trim().length === 0) {
        sourceText.style.borderColor = "red"
        return
    } else {
        sourceText.style.borderColor = ""
    }
    loading.style.display = "block"

    let api = `https://lingva.ml/api/v1/${firstLanguage.value}/${secondLanguage.value}/${sourceText.value}`
    fetch(api)
        .then((response) => response.json())
        .then((data) => {
            translatedText.style.color = "white"
            translatedText.style.borderColor = ""
            translatedText.value = data.translation
            loading.style.display = "none"
            copyBtn.style.display = "block"
        })
        .catch((err) => {
            console.log(err)
            loading.style.display = "none"
            translatedText.value = "Try again"
            translatedText.style.color = "red"
            translatedText.style.borderColor = "red"
            copyBtn.style.display = "none"
        })
})

copyBtn.addEventListener("click", () => {
    copyBtn.classList.remove("bxs-copy")
    copyBtn.classList.add("bx-check-double")
    setTimeout(() => {
        copyBtn.classList.remove("bx-check-double")
        copyBtn.classList.add("bxs-copy")
    }, 2000)
    translatedText.select()
    translatedText.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(translatedText.value)
})


volumeBtn.addEventListener("click", () => {
    const textToSpeak = translatedText.value; 
    if (textToSpeak.trim().length === 0) {
        return;
    }
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = secondLanguage.value; 
    window.speechSynthesis.speak(utterance);
});