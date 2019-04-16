export const camelcaseToDash = name => name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
