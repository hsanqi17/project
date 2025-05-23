class Splash {
  constructor() {
    this.splashBorder = 0;
    fill(300);
    stroke(0, 0, 0);
    rect(
      this.splashBorder,
      this.splashBorder,
      windowWidth - this.splashBorder * 2,
      windowHeight - this.splashBorder * 2
    );

    fill(0, 0, 222);
    strokeWeight(3);

    line(
      windowWidth - this.splashBorder - 40,
      this.splashBorder + 20,
      windowWidth - this.splashBorder - 20,
      this.splashBorder + 40
    );
    line(
      windowWidth - this.splashBorder - 20,
      this.splashBorder + 20,
      windowWidth - this.splashBorder - 40,
      this.splashBorder + 40
    );

    this.title = createDiv("Final Project");
    this.title.style("color:#673AB7");
    this.title.style("font-family: Arial, Helvetica, sans-serif");
    this.title.position(this.splashBorder + 20, this.splashBorder + 20);

    this.name = createDiv("Angel Huang");
    this.name.position(this.splashBorder + 20, this.splashBorder + 60);

    this.info = createDiv(
      " This is a cat synth, click each cat to add different music layer. <p> <a href=https://editor.p5js.org/hsanqi/sketches/-Npbe2Rag>view code</a>"
    );

    this.info.position(this.splashBorder + 20, this.splashBorder + 100);
    this.info.size(
      windowWidth - this.splashBorder * 2 - 50,
      windowHeight - this.splashBorder * 2 - 50
    );
  }

  update() {
    if (
      mouseX > windowWidth - this.splashBorder - 40 &&
      mouseX < windowWidth - this.splashBorder - 20 &&
      mouseY < this.splashBorder + 40 &&
      mouseY > this.splashBorder + 20
    ) {
      return true;
    }
  }

  hide() {
    this.title.remove();
    this.name.remove();
    this.info.remove();
  }
}
