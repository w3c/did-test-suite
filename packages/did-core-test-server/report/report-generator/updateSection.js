module.exports = updateSection = ($, target, title, report) => {
    $(`#${target}`).replaceWith(`
    <section id="${target}">
    <h2>${title}</h2>
    ${report}
    </section>

    `);
};
