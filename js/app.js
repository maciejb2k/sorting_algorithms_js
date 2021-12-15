document.addEventListener("DOMContentLoaded", async () => {
  const sortingContainer = document.querySelector(".Sorting");
  const form = document.querySelector(".Form");
  const message = document.querySelector(".Message");

  let items = [];
  let speed = 1;
  let isSorting = false;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (isSorting) {
      setMessage("error", "Poczekaj, aż sortowanie się zakończy");
      return;
    }

    clearMessage();

    const elems = Number(e.target.elements["elems"].value.trim());
    const min = Number(e.target.elements["min"].value.trim());
    const max = Number(e.target.elements["max"].value.trim());
    const sortType = e.target.elements["sortType"].value.trim();
    const sortComparing = e.target.elements["sortComparing"].value.trim();
    speed = Number(e.target.elements["duration"].value.trim());

    if (validateForm(elems, min, max)) {
      generateItems(elems, min, max);

      let startTime = performance.now();
      let comparing = sortComparing === "asc" ? true : false;

      if (sortType === "bubble") {
        await bubbleSort(comparing);
      }

      if (sortType === "insert") {
        await insertSort(comparing);
      }

      if (sortType === "select") {
        await selectSort(comparing);
      }

      let endTime = performance.now();
      setMessage("success", `Czas wykonania: ${endTime - startTime} ms`);
    }
  });

  const validateForm = (elems, min, max) => {
    if (!(elems > 0 && elems <= 100)) {
      setMessage("error", "Ilość elementów może być między 0 a 100.");
      return false;
    }

    if (!(min > 0 && min <= 1000)) {
      setMessage("error", "Wartość minimalna może być miedzy 1 a 1000");
      return false;
    }

    if (!(max > 0 && max <= 1000)) {
      setMessage("error", "Wartość maksymalna może być miedzy 1 a 1000");
      return false;
    }

    if (min > max) {
      setMessage(
        "error",
        "Minimalna wartość nie może być więszka niż maksymalna.",
      );
      return false;
    }

    return true;
  };

  const generateItems = (n, min, max) => {
    sortingContainer.innerHTML = "";
    items = [];
    let currentMax = 0;

    for (let i = 0; i < n; i++) {
      const value = getRandomInt(min, max);

      if (value >= currentMax) {
        currentMax = value;
      }

      const bar = document.createElement("div");
      bar.classList.add("Bar");
      bar.style.height = value + "px";
      bar.dataset.value = value;

      const label = document.createElement("label");
      label.classList.add("Bar-label");
      label.innerText = value;

      bar.appendChild(label);
      sortingContainer.appendChild(bar);

      items.push(bar);
    }

    sortingContainer.style.paddingBottom = `calc(55vh - ${currentMax}px)`;
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const delay = async () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100 / speed);
    });

  const compare = async (index1, index2, comparing = true) => {
    await delay();
    let value1 = Number(items[index1].dataset.value);
    let value2 = Number(items[index2].dataset.value);
    if (comparing) {
      if (value1 > value2) {
        return true;
      }
    } else {
      if (value1 < value2) {
        return true;
      }
    }

    return false;
  };

  const swap = async (index1, index2) => {
    await delay();

    let value1 = items[index1].dataset.value;
    let value2 = items[index2].dataset.value;

    items[index1].dataset.value = value2;
    items[index1].style.height = `${value2}px`;
    items[index1].children[0].innerText = value2;

    items[index2].dataset.value = value1;
    items[index2].style.height = `${value1}px`;
    items[index2].children[0].innerText = value1;
  };

  const mark = async (index) => {
    items[index].classList.add("Bar--current");
  };

  const unmark = async (index) => {
    items[index].classList.remove("Bar--current");
    if (items[index].classList.contains("Bar--currentMin")) {
      items[index].classList.remove("Bar--currentMin");
    }
  };

  const markSpl = async (index) => {
    items[index].classList.add("Bar--currentMin");
  };

  const enableSorting = () => {
    isSorting = true;
    document.querySelector(".Form-submit").disabled = true;
  };

  const disableSorting = () => {
    isSorting = false;
    document.querySelector(".Form-submit").disabled = false;
  };

  const setMessage = (type, text) => {
    message.innerText = text;

    if (type === "error") {
      message.classList.add("Message--error");
    }

    if (type === "success") {
      message.classList.add("Message--success");
    }
  };

  const clearMessage = () => {
    if (message.classList.contains("Message--error")) {
      message.classList.remove("Message--error");
    }

    if (message.classList.contains("Message--success")) {
      message.classList.remove("Message--success");
    }

    message.innerText = "";
  };

  const bubbleSort = async (comparing) => {
    enableSorting();

    for (let i = 0; i < items.length - 1; ++i) {
      for (let j = 0; j < items.length - i - 1; ++j) {
        await mark(j);
        await mark(j + 1);
        if (await compare(j, j + 1, comparing)) {
          await swap(j, j + 1);
        }
        await unmark(j);
        await unmark(j + 1);
      }
      items[items.length - i - 1].classList.add("Bar--done");
    }
    items[0].classList.add("Bar--done");

    disableSorting();
  };

  const insertSort = async (comparing) => {
    enableSorting();

    for (let i = 0; i < items.length - 1; ++i) {
      let j = i;
      while (j >= 0 && (await compare(j, j + 1, comparing))) {
        await mark(j);
        await mark(j + 1);
        await delay();
        await swap(j, j + 1);
        await unmark(j);
        await unmark(j + 1);
        j -= 1;
      }
    }
    for (let counter = 0; counter < items.length; ++counter) {
      items[counter].classList.add("Bar--done");
    }

    disableSorting();
  };

  const selectSort = async (comparing) => {
    enableSorting();

    for (let i = 0; i < items.length; ++i) {
      let minIndex = i;
      for (let j = i; j < items.length; ++j) {
        await markSpl(minIndex);
        await mark(j);
        if (await compare(minIndex, j, comparing)) {
          await unmark(minIndex);
          minIndex = j;
        }
        await unmark(j);
        await markSpl(minIndex);
      }
      await mark(minIndex);
      await mark(i);
      await delay();
      await swap(minIndex, i);
      await unmark(minIndex);
      items[i].classList.add("Bar--done");
    }

    disableSorting();
  };
});
