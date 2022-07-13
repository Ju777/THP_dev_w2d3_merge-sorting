const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });

// Les 3 fonctions qui suivent valident et formattent les données du fichier list.txt en un tableau
function validateInputFile(argument) {
    if (argument === "list_even.txt" || argument === "list_odd.txt" || argument === "list.txt") {
        return true;
    }
    else {
        console.log("Erreur, veuillez saisir :\n-> node sorting.js list.txt <-");
        return false;
    }
}

function getDataFromFile(fileName) {
    var data;
    try {
        data = fs.readFileSync(fileName, 'utf8');
    } catch (error) {
        console.error(error.message);
    }
    return data;
}

function dataToArray(data) {
    let array = data.split(' ');
    array = array.map(string => string = parseInt(string));
    return array;
}
// Fin des 3 fonctions de validation et formatage des données de list.txt en un tableau

// La fonction suivante ré-intialise le tableau de données à trier.
function dataReset(){
    if (validateInputFile(process.argv[2])) {
        const data = getDataFromFile(process.argv[2]);
        const dataArray = dataToArray(data);
        return dataArray;
    } else {
        return false;
    }
}

class Sort {
    constructor() {
        // this.arrayToSort = arrayToSort;
        this.nbComparisons = 0;
    }

    resetNbComparisons() {
        this.nbComparisons = 0;
    }

    mergeSort(array) { // Using recursion
        //log de vérif
        // console.log("DEBUT MERGESORT(array).")
        // prompt("[ENTER]");
       
        // Base case : si le tableau array contient 1 élélent ou moins, on le retourne.
        if (array.length < 2) {
            // console.log(`Récursion terminés pour ${array}.`)
            // prompt("[ENTER]");
            return array;
        }
        
        else {

            // Le départ est de séparer le tableau en 2 moitiés
            let left = array.slice(0, array.length/2);
            let right = array.slice(array.length/2, array.length);
    
            // log de vérif
            // console.log(`LEFT = ${left} | ${right} = RIGHT.`);
            // prompt("[ENTER]");

            this.mergeSort(left);
            this.mergeSort(right);
            
            // console.log("\nFIN MERGESORT(array).")
            // console.log("~".repeat(100));
            return this.merging(left, right, array);
        }
        
    }

    merging(left, right, array) {
        // console.log("\n" + "~".repeat(50));
        // console.log(`DEBUT DE MERGING = états des tableaux => `);
        // console.log(`[L|R] ARRAY : [${left}|${right}] ${array}`);
        // prompt("[ENTER]");
        let i = 0;
        let j = 0;
        let k = 0;

        while(i < left.length && j < right.length) {
            this.nbComparisons++;
            if(left[i] < right[j]) {
                
                array[k] = left[i];
                i++;
                k++;
            } else {
                array[k] = right[j];
                j++;
                k++;
            }
            // console.log(`FIN DE WHILE A`);
            // console.log(`[L|R] ARRAY : [${left}|${right}] ${array}`);
            // prompt("[ENTER]");

        }

        while(i < left.length) {
            array[k] = left[i];
            i++;
            k++;
            // console.log(`FIN DE WHILE B`);
            // console.log(`[L|R] ARRAY : [${left}|${right}] ${array}`);
            // prompt("[ENTER]");
        }

        while(j < right.length) {
            array[k] = right[j];
            j++;
            k++;
            // console.log(`FIN DE WHILE C`);
            // console.log(`[L|R] ARRAY : [${left}|${right}] ${array}`);
            // prompt("[ENTER]");
        }
        // console.log(`\nFIN GENERAL MERGING`);
        // console.log(`[L|R] ARRAY : [${left}|${right}] ${array}`);
        // prompt("[ENTER]");
        return array;
    }
}

function perform () {
    var rawArray = dataReset();
    
    if (rawArray !== false) {

        let sort = new Sort();
        console.log("\n" + "~".repeat(50));
        console.log(`Le tableau à trier est ${rawArray}, sa longueur est ${rawArray.length}`);
        prompt("[ENTER]");

        // Lancement du tri fusion
        rawArray = dataReset();
        sort.resetNbComparisons();
        
        let mergeSorting = sort.mergeSort(rawArray);
        console.log(`\n\tTri fusion -> ${sort.nbComparisons} comparaisons :\n[${mergeSorting}].`);
        prompt("[ENTER]");
    }
}

perform();