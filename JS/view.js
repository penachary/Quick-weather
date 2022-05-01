const data = {
  pressure: [1, 2, 3],
  humadity: [1, 2, 3],
  cover: [1, 2, 3],
};

const markupMaker = function (num) {
  return `
    <ul class="list-group-daily daily-group1">
          <li class="list-daily">Pressure $${data.pressure[num]}hPa</li>
          <li class="list-daily">Humidity ${data.humadity[num]}%</li>
          <li class="list-daily">Cloud cover ${data.cover[num]}% </li>
    </ul>`;
};
export let markupEcma = "";
for (let i = 0; i < 3; i++) {
  markupEcma += markupMaker(i);
}
