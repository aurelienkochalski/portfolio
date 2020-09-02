// Function that return a sanitized technology name (useful for using with an icon system)
export function sanitizeTechnology(str) {

    // Specific technology replacement
    str = str.replace(/#/g, "sharp");

    // Global sanitizing (lowercase, white space triming, specialchars replacement)
    str = str.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

    return str;
}

// Function that splits an array in multiple arrays of `length` elements
export function splitArray(array, length) {
    return array.reduce(
        (result, item, index) => {
            if (index % length === 0) result.push([]);
            result[Math.floor(index / length)].push(item);
            return result;
        },
        []
    );
}

// Function that build an array by extracting recursively all translations from a data source
export function buildTranslations(data, language) {

    // If we have a translation table at this level, we translate avalaible properties (only at this level)
    if (data.translations != undefined) {
        //console.log("translation found for", data.translations);
        if (data.translations[language] != undefined) {
            //console.log("translation", data.translations[language], "found");
            for (const property in data.translations[language]) {
                // We replace with the translated value
                if (data[property] != undefined) {
                    data[property] = data.translations[language][property];
                }
            }
        }
        // We have retrieved the translations, we can remove the translation table as it will not be necessary in the final output
        delete data.translations;
    }

    // We loop through all properties to find nested object to translated
    for (const property in data) {
        // We treat arrays and objects differently to keep the array structure
        if (Array.isArray(data[property])) {
            data[property] = buildTranslations([...data[property]], language);
        }
        else if (typeof data[property] == "object") {
            data[property] = buildTranslations({...data[property]}, language);
        }
    }

    return data;
}
