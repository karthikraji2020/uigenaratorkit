const boxContent = document.querySelector(".box");
const copyCssContent = document.querySelector(".copy-css");
const colorCodeInHex = document.querySelector("#colorCodeInHex");
var containerContent = document.querySelector(".box-wrapper");

const sizeRange = document.querySelector("#sizeRange");
const radiusRange = document.querySelector("#radiusRange");
const distanceRange = document.querySelector("#distanceRange");
const blurRange = document.querySelector("#blurRange");
const intensityRange = document.querySelector("#intensityRange");

const sizeRangeValue = document.querySelector("#sizeRangeValue");
const radiusRangeValue = document.querySelector("#radiusRangeValue");
const distanceRangeValue = document.querySelector("#distanceRangeValue");
const blurRangeValue = document.querySelector("#blurRangeValue");
const intensityRangeValue = document.querySelector("#intensityRangeValue");
var selectedDirection = "135deg";
var isInset = true;
const copyButton = document.getElementById("copy");
const textButton = document.querySelector(".copy-css");
const shapeType = document.querySelector('#shapeType');

// sizeRangeValue.innerHTML = sizeRange.value;
// boxContent.style.width  = sizeRange.value;
// boxContent.style.height  = sizeRange.value;

sizeRangeValue.innerText = `${sizeRange.value}`;
radiusRangeValue.innerHTML = `${radiusRange.value}`;
distanceRangeValue.innerHTML = `${distanceRange.value}`;
blurRangeValue.innerHTML = `${blurRange.value}`;
intensityRangeValue.innerHTML = `${intensityRange.value / 10}`;

boxContent.style.boxShadow = checkDirection();
boxContent.style.width = sizeRange.value;
boxContent.style.height = sizeRange.value;
addcopycss();

// const rgbToHex = function (rgb) {
//   let RGB = rgb.split("rgb(")[1].split(")").join("").split(",");
//   let darray = "";
//   for (let index = 0; index < RGB.length; index++) {
//     const element = RGB[index];
//     var hex = Number(element).toString(16);
//     if (hex.length < 2) {
//       hex = "0" + hex;
//     }
//     darray += hex;
//   }
//   return `#${darray}`;
// };

// sizeRange(sizeRange.value);
sizeRange.oninput = function () {
  sizeRangeValue.innerHTML = `${this.value}`;
  //ratio  Calculations
  let blurRatio = Number(this.value) / 5;
  let distanceRatio = Number(this.value) / 10;
  let radiusRatio = Number(this.value) / 2;

  blurRange.value = blurRatio;
  blurRangeValue.innerHTML = blurRatio;

  distanceRange.value = distanceRatio;
  distanceRangeValue.innerHTML = distanceRatio;

  radiusRange.max = radiusRatio;
  radiusRange.value = radiusRatio / 1.5;
  radiusRangeValue.innerHTML = radiusRatio;

  boxContent.style.width = `${this.value}px`;
  boxContent.style.height = `${this.value}px`;
  boxContent.style.borderRadius = radiusRange.value;
  addcopycss();
};

radiusRange.oninput = function () {
  radiusRangeValue.innerHTML = `${this.value}`;
  boxContent.style.borderRadius = `${this.value}px`;
  addcopycss();
};

distanceRange.oninput = function () {
  distanceRangeValue.innerHTML = `${this.value}`;
  boxContent.style.boxShadow = checkDirection();
  addcopycss();
};

blurRange.oninput = function () {
  blurRangeValue.innerHTML = `${this.value}`;
  // boxContent.style.boxShadow =  `${this.value}px`;
  boxContent.style.boxShadow = checkDirection();
  addcopycss();
};

intensityRange.oninput = function () {
  intensityRangeValue.innerHTML = `${this.value / 10}`;
  boxContent.style.boxShadow = `${this.value}px`;
  addcopycss();
};
function getBackgroundColor(elem) {
  let background = window
    .getComputedStyle(elem, null)
    .getPropertyValue("background-color");
  return background;
}

function CopyColorToClipboard(content) {
  var range = document.createRange();
  range.selectNode(content);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  alert("Color Code Copied " + content.innerText);
  window.getSelection().removeAllRanges(); // to deselect
}
// sizeRange.trigger('input');
const e = new Event("input");
sizeRange.dispatchEvent(e);
function addcopycss() {
  let boxShadowvalues = checkDirection();
  copyCssContent.innerText = `background:${getBackgroundColor(
    containerContent
  )};\nborder-radius:${
    radiusRangeValue.innerHTML
  }px;\nboxShadow : ${boxShadowvalues};`;
  boxContent.style.boxShadow = `${boxShadowvalues}`;
  boxContent.style.borderRadius = `${radiusRangeValue.innerHTML}px`;
}

function ratioCalucations() {
  let ratio = Number(sizeRangeValue.innerHTML) / 10;
  let blurRatio = Number(sizeRangeValue.innerHTML) / 5;
  return ratio;
}

function changeBgColor(colorValue) {
  debugger;
  if (!colorValue.includes("#") && !colorValue.includes("rgba(")) {
    colorCodeInHex.value = rgbToHex(colorValue);
  }
  // colorCodeInHex.value=colorValue;
  colorCodeInHex.value = document.querySelector(".pcr-result").value;
  // containerContent.style.backgroundImage =  `linear-gradient(${selectedDirection},${colorValue},${bgColorTwo.value})`;
  document.querySelector(".box-wrapper").style.backgroundColor = `${colorValue}`;
}

function changePositionTo(pos, thisObj) {
  selectedDirection = pos;
  if (thisObj !== "" && thisObj !== undefined) {
    $(".position-wrapper .active").removeClass("active");
    $(thisObj).addClass("active");
  }
  addcopycss();
}

function checkDirection() {
  let boxshadow, boxshadowWithInset, firstInsetData, data1, secondInsetData;
  boxshadow = getBoxShadow();
  firstInsetData = "inset" + boxshadow.split("), ")[0] + ") ,";
  data1 = boxshadow.split("), ")[1];
  secondInsetData = "inset " + data1;
  boxshadowWithInset = firstInsetData + secondInsetData;

  //checking whether inset Enabled
  if (isInset) {
    return boxshadow;
  } else {
    return boxshadowWithInset;
  }
}
function toggleInset(Obj) {
  isInset = isInset ? false : true;
  isInset ? shapeType.textContent = "Inset" : shapeType.textContent = "Flat";
  addcopycss();
}
function getBoxShadow() {
  var data, test, firstPointShadowColor, secondPointShadowColor;
  let ratio = Number(distanceRangeValue.innerHTML);
  let blurRatio = Number(blurRangeValue.innerHTML);
  // let ratio =Number(sizeRange.innerHTML)/10;
  // let blurRatio =Number(blurRangeValue.innerHTML);
  data = getBackgroundColor(containerContent);
  test = intensityRangeValue.innerHTML;
  if (!data.includes("rgba(")) {
    firstPointShadowColor = data
      .replace("rgb(", "rgba(")
      .replace(")", `,${intensityRangeValue.innerHTML})`);
    // secondPointShadowColor = data.replace('rgb(','rgba(').replace(')',`,${intensityRangeValue.innerHTML * 2})`);
    let hexValue = rgbToHex(data);
    let inverterHexValue = invertColor(hexValue);
    let result = hexToRGBA(inverterHexValue);

     let newData = result.split(',');
     let secondStopShadow = Number(intensityRangeValue.innerHTML)*1.8;
     let  roundedOpacity = secondStopShadow.toFixed(1);
     let opResult = `${newData[0]},${newData[1]},${newData[2]},${roundedOpacity})`

    // secondPointShadowColor = result.replace(')',`,${intensityRangeValue.innerHTML})`);
    secondPointShadowColor = opResult;
    // Returns FF00FF
  } else {
    firstPointShadowColor = data;
    secondPointShadowColor = data;
  }

  switch (selectedDirection) {
    case "135deg":
      return ` ${ratio}px ${ratio}px ${blurRatio}px ${firstPointShadowColor}, -${ratio}px -${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
    case "225deg":
      return ` -${ratio}px ${ratio}px ${blurRatio}px ${firstPointShadowColor}, -${ratio}px ${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
    case "315deg":
      return ` -${ratio}px -${ratio}px ${blurRatio}px ${firstPointShadowColor}, ${ratio}px ${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
    case "45deg":
      return ` ${ratio}px -${ratio}px ${blurRatio}px ${firstPointShadowColor}, ${ratio}px -${ratio}px ${blurRatio}px ${secondPointShadowColor}`;
      break;
    default:
      return "daet";
  }
}

function invertColor(hexTripletColor) {
  var color = hexTripletColor;
  color = color.substring(1); // remove #
  color = parseInt(color, 16); // convert to integer
  color = 0xffffff ^ color; // invert three bytes
  color = color.toString(16); // convert to hex
  color = ("000000" + color).slice(-6); // pad with leading zeros
  color = "#" + color; // prepend #
  return color;
}

function hexToRGBA(hex, opacity) {
  return (
    "rgba(" +
    (hex = hex.replace("#", ""))
      .match(new RegExp("(.{" + hex.length / 3 + "})", "g"))
      .map(function (l) {
        return parseInt(hex.length % 2 ? l + l : l, 16);
      })
      .concat(opacity || 1)
      .join(",") +
    ")"
  );
}

toggleInset.apply();
setTimeout(() => {
  changePositionTo("135deg");
}, 800);

const copyText = (e) => {
  debugger;
  window.getSelection().selectAllChildren(textButton);
  document.execCommand("copy");
  e.target.setAttribute("tooltip", "Copied! ✅");
};

const resetTooltip = (e) => {
  e.target.setAttribute("tooltip", "Copy to clipboard");
};

copyButton.addEventListener("click", (e) => copyText(e));
copyButton.addEventListener("mouseover", (e) => resetTooltip(e));

const pickr = Pickr.create({
  el: ".color-picker",
  theme: "nano", // or 'monolith', or 'nano'
  default: "#42445a",
  comparison: false,
  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,
    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      input: true,
      // save: true
    },
  },
});

pickr.on("change", (color, instance) => {
  let rgbaColor = color.toRGBA().toString();
  changeBgColor(rgbaColor);
});
