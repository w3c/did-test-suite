module.exports = updateSection = ($, target, title, preamble, report) => {
    $(`#${target}`).replaceWith(`
    <section id="${target}">
    <h2>${title}</h2>
    ${preamble}
    ${report}
    </section>

    `);
};
