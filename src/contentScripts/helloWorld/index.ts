const parentEl = document.querySelector('strong[itemprop="name"]');
const linkEl = parentEl.querySelector('a');
const text = linkEl.textContent;

linkEl.innerHTML = '';

// @ts-ignore
new HelloWorld({ text }).render(linkEl);
