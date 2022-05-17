class DropdownView {
  _parentElement = document.querySelector(".dropdown-menu");
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.classList.add("active-dropdown");
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
   if (this._parentElement.classList.contains("active-dropdown")) this._parentElement.classList.remove("active-dropdown");
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
        <li><a class="dropdown-item" lat = "${this._data.lat[num]}" lng = "${this._data.lng[num]}">${this._data.country[num]} ${this._data.cityName[num]}</a></li>
    `;
  };
}
export default new DropdownView();
