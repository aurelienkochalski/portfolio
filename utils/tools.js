// Function that return a sanitized technology name (useful for using an icon system)
export function sanitizeTechnology(str) {

    // Specific technology replacement
    str = str.replace(/#/g, "sharp");

    // Global sanitizing (lowercase, white space triming, specialchars replacement)
    str = str.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

    return str;
}
