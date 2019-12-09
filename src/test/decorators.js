import changeArray from "../utils/change.array/change.array";

export function handleError(target, name, descriptor) {
    const original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = function(...args) {
            console.log(`Arguments: ${args}`);
            try {
                original.apply(this, args);
            } catch (e) {
                console.error(`Error: ${e}`)
                changeArray.saveInFile()
                throw e;
            }
        }
    }
    return descriptor;
}
