function translateText() {
  const text = document.getElementById("inputText").value;
  const targetLang = document.getElementById("targetLang").value;

  const data = JSON.stringify({
    q: text,
    target: targetLang,
    source: 'auto'
  });

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      try {
        const response = JSON.parse(this.responseText);
        const translated = response.data.translations[0].translatedText;
        document.getElementById("outputText").innerText = translated;
      } catch (err) {
        document.getElementById("outputText").innerText = "Translation failed. Try again!";
        console.error("Parsing error:", err);
      }
    }
  });

  xhr.open('POST', 'https://google-translator9.p.rapidapi.com/v2');
  xhr.setRequestHeader('x-rapidapi-key', '0d870d6b37msh7e72ad6bab1c5b3p1ce982jsnf55ab04151a3');  
  xhr.setRequestHeader('x-rapidapi-host', 'google-translator9.p.rapidapi.com');
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.send(data);
}
