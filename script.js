let array = [];
let arrayLength = 20;
let isSorting = false;
let searchTarget = null;

const arrayContainer = document.getElementById("array-container");
const arrayValuesContainer = document.getElementById("array-values");
const startButton = document.getElementById("start-btn");
const generateButton = document.getElementById("generate-btn");
const statusText = document.getElementById("status");
const searchInput = document.getElementById("search-target");
const sortingSelect = document.getElementById("sorting-algorithm");
const searchingSelect = document.getElementById("searching-algorithm");

// Generate a random array
function generateArray() {
    array = [];
    for (let i = 0; i < arrayLength; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);  // Random values between 1 and 100
    }
    renderArray();
    renderArrayValues();
}

// Render the array as bars
function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;  // Scale bar height
        arrayContainer.appendChild(bar);
    });
}

// Render the array values as text
function renderArrayValues() {
    arrayValuesContainer.innerText = `Array: [${array.join(", ")}]`;
}

// Delay function for visualizing step-by-step operations
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort Visualization
async function bubbleSort() {
    if (isSorting) return;

    isSorting = true;
    startButton.disabled = true;
    generateButton.disabled = true;
    statusText.innerText = "Sorting in progress...";

    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            const bars = document.querySelectorAll(".bar");
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";
            await sleep(100);

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            }

            bars[j].style.backgroundColor = "#4CAF50";
            bars[j + 1].style.backgroundColor = "#4CAF50";
        }
    }

    renderArrayValues();  // Display the sorted array
    isSorting = false;
    startButton.disabled = false;
    generateButton.disabled = false;
    statusText.innerText = "Sorting completed!";
}

// Selection Sort Visualization
async function selectionSort() {
    if (isSorting) return;

    isSorting = true;
    startButton.disabled = true;
    generateButton.disabled = true;
    statusText.innerText = "Sorting in progress...";

    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        const bars = document.querySelectorAll(".bar");

        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = "red";
            await sleep(100);

            if (array[j] < array[minIdx]) {
                minIdx = j;
            }

            bars[j].style.backgroundColor = "#4CAF50";
        }

        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIdx].style.height = `${array[minIdx] * 3}px`;
        }
    }

    renderArrayValues();  // Display the sorted array
    isSorting = false;
    startButton.disabled = false;
    generateButton.disabled = false;
    statusText.innerText = "Sorting completed!";
}

// Insertion Sort Visualization
async function insertionSort() {
    if (isSorting) return;

    isSorting = true;
    startButton.disabled = true;
    generateButton.disabled = true;
    statusText.innerText = "Sorting in progress...";

    let n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        const bars = document.querySelectorAll(".bar");

        bars[i].style.backgroundColor = "red";
        await sleep(100);

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j].style.height = `${array[j] * 3}px`;
            j--;
        }

        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;

        bars[i].style.backgroundColor = "#4CAF50";
    }

    renderArrayValues();  // Display the sorted array
    isSorting = false;
    startButton.disabled = false;
    generateButton.disabled = false;
    statusText.innerText = "Sorting completed!";
}

// Merge Sort Visualization (uses divide and conquer)
async function mergeSort() {
    if (isSorting) return;

    isSorting = true;
    startButton.disabled = true;
    generateButton.disabled = true;
    statusText.innerText = "Sorting in progress...";

    await mergeSortHelper(array, 0, array.length - 1);
    renderArrayValues();  // Display the sorted array

    isSorting = false;
    startButton.disabled = false;
    generateButton.disabled = false;
    statusText.innerText = "Sorting completed!";
}

async function mergeSortHelper(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(arr, left, mid);
        await mergeSortHelper(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }
}

async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            k++;
            i++;
        } else {
            arr[k] = rightArr[j];
            k++;
            j++;
        }
        await sleep(50);
        renderArray();
        renderArrayValues();
    }

    while (i < n1) {
        arr[k] = leftArr[i];
        k++;
        i++;
        await sleep(50);
        renderArray();
        renderArrayValues();
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        k++;
        j++;
        await sleep(50);
        renderArray();
        renderArrayValues();
    }
}

// Quick Sort Visualization
async function quickSort() {
    if (isSorting) return;

    isSorting = true;
    startButton.disabled = true;
    generateButton.disabled = true;
    statusText.innerText = "Sorting in progress...";

    await quickSortHelper(array, 0, array.length - 1);
    renderArrayValues();  // Display the sorted array

    isSorting = false;
    startButton.disabled = false;
    generateButton.disabled = false;
    statusText.innerText = "Sorting completed!";
}

async function quickSortHelper(arr, low, high) {
    if (low < high) {
        const pivot = await partition(arr, low, high);
        await quickSortHelper(arr, low, pivot - 1);
        await quickSortHelper(arr, pivot + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    const bars = document.querySelectorAll(".bar");

    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "red";
        await sleep(100);

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            bars[i].style.height = `${arr[i] * 3}px`;
            bars[j].style.height = `${arr[j] * 3}px`;
        }
        bars[j].style.backgroundColor = "#4CAF50";
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i + 1].style.height = `${arr[i + 1] * 3}px`;
    bars[high].style.height = `${arr[high] * 3}px`;

    return i + 1;
}

// Linear Search Visualization
async function linearSearch() {
    const target = parseInt(searchInput.value);
    if (isNaN(target)) {
        statusText.innerText = "Please enter a valid number to search for.";
        return;
    }

    isSorting = true;
    startButton.disabled = true;
    generateButton.disabled = true;
    statusText.innerText = "Searching...";

    for (let i = 0; i < array.length; i++) {
        const bars = document.querySelectorAll(".bar");

        bars[i].style.backgroundColor = "red";
        await sleep(100);

        if (array[i] === target) {
            bars[i].style.backgroundColor = "blue";
            statusText.innerText = `Found ${target} at index ${i}!`;
            renderArrayValues();  // Display the array after the search
            break;
        }

        bars[i].style.backgroundColor = "#4CAF50";
    }

    if (!statusText.innerText.includes('Found')) {
        renderArrayValues();  // Display the array after the search
        statusText.innerText = `${target} not found!`;
    }

    isSorting = false;
    startButton.disabled = false;
    generateButton.disabled = false;
}

// Binary Search Visualization
async function binarySearch() {
    const target = parseInt(searchInput.value);
    if (isNaN(target)) {
        statusText.innerText = "Please enter a valid number to search for.";
        return;
    }

    let left = 0;
    let right = array.length - 1;
    let found = false;

    // Binary search assumes the array is sorted
    array.sort((a, b) => a - b);

    isSorting = true;
    startButton.disabled = true;
    generateButton.disabled = true;
    statusText.innerText = "Searching...";

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const bars = document.querySelectorAll(".bar");

        bars[mid].style.backgroundColor = "red";
        await sleep(100);

        if (array[mid] === target) {
            bars[mid].style.backgroundColor = "blue";
            statusText.innerText = `Found ${target} at index ${mid}!`;
            renderArrayValues();  // Display the array after the search
            found = true;
            break;
        }

        if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }

        bars[mid].style.backgroundColor = "#4CAF50";
    }

    if (!found) {
        renderArrayValues();  // Display the array after the search
        statusText.innerText = `${target} not found!`;
    }

    isSorting = false;
    startButton.disabled = false;
    generateButton.disabled = false;
}

// Event Listeners for Controls
startButton.addEventListener("click", () => {
    const sortingAlgorithm = sortingSelect.value;
    const searchingAlgorithm = searchingSelect.value;

    // Perform selected sorting algorithm
    if (sortingAlgorithm) {
        switch (sortingAlgorithm) {
            case "bubbleSort": bubbleSort(); break;
            case "selectionSort": selectionSort(); break;
            case "insertionSort": insertionSort(); break;
            case "mergeSort": mergeSort(); break;
            case "quickSort": quickSort(); break;
        }
    }

    // Perform selected searching algorithm
    if (searchingAlgorithm) {
        switch (searchingAlgorithm) {
            case "linearSearch": linearSearch(); break;
            case "binarySearch": binarySearch(); break;
        }
    }
});

generateButton.addEventListener("click", generateArray);

// Initialize with a random array
generateArray();
