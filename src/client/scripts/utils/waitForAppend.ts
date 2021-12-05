/**
 * Resolves when an element is appended to the document.
 * @param id The ID of the new element.
 * @param parentId The ID of the parent element to observe.
 */
export const waitForAppend = (id: string, parentId?: string): Promise<void> => {
    return new Promise((resolve) => {
        new MutationObserver((mutations, obs) => {
            if (document.getElementById(id)) {
                obs.disconnect(); // stop observing
                resolve();
            }
        }).observe(parentId ? (document.getElementById(parentId) ?? document) : document, {
            childList: true,
            subtree: true
        });
    });
};
