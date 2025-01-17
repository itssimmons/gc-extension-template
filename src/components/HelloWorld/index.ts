class HelloWorld {
  private el: HTMLElement = null;
  private originalText: string;
  private encodedText: string;

  constructor(props?: Props) {
    this.originalText = props?.text || 'Hola Mundo';
    this.encodedText = HelloWorld.encodeText(this.originalText);
    this.el = this.createElement();
  }

  private createElement() {
    const el = document.createElement('p');
    el.classList.add('projectid', 'HelloWorld');
    el.style.margin = '0px';
    el.textContent = this.encodedText;
    return el;
  }

  private static encodeText(text: string): string {
    const chars = [
      '1234567890',
      'abcdefghijklmnñopqrstuvwxyz',
      'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
      '@#$%&/\\()<>=¿?!¡{}[]',
    ].join('');

    return Array.from({ length: text.length }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  private async animateCharacterTransition({
    resultArray,
    targetChar,
    key,
    delay = 250,
    steps = 3,
  }: {
    resultArray: string[];
    targetChar: string;
    key: number;
    steps?: number;
    delay?: number;
  }) {
    for (let step = 0; step < steps; step++) {
      resultArray[key] = HelloWorld.encodeText(' ');
      this.el.textContent = resultArray.join('');
      await wait(delay / steps);
    }

    resultArray[key] = targetChar;
    this.el.textContent = resultArray.join('');
  }

  private async progressiveTextDecoding(delay: number = 250) {
    const mutableResult = [...this.encodedText];
    let key = 0;

    while (key < this.originalText.length) {
      const targetChar = this.originalText[key];

      await this.animateCharacterTransition({
        key,
        resultArray: mutableResult,
        targetChar,
        delay,
        steps: 6,
      });

      key++;
      // await wait(delay);
    }
  }

  public render(target: Element) {
    target.insertAdjacentElement('afterbegin', this.el);
    this.progressiveTextDecoding(500);
  }
}

const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

interface Props {
  text: string;
}
