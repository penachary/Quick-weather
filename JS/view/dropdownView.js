class DropdownView {
  _parentElement = document.querySelector(".dropdown-menu");
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup() {
    let markup = "";
    for (let i = 0; i < this._data.country.length; i++) {
      markup += this._markupMakerHourly(i);
    }
    return markup;
  }
  _markupMakerHourly = function (num) {
    return `
        <li><a class="dropdown-item" href="#">${this._data.country[num]} ${this._data.cityName[num]}</a></li>
    `;
  };
}
export default new DropdownView();
