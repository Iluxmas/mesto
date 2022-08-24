export default class Section {
  constructor({ renderer }, containerSelector) {
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render(data) {
    this._container.innerHTML = "";
    data.forEach((item) => this.addItem(this.renderer(item)));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
