const showdown = require('showdown');
const fs = require('fs');

const converter = new showdown.Converter();
// copiar o readme para /static e alterar links
const readme = fs.readFileSync('./README.md');
const linkLogo = readme.toString().replace('static/logo/logo-completo-hor.svg', 'logo/logo-completo-hor.svg');
const linkChangelog = linkLogo.replace('static/doc/CHANGELOG.md', 'doc/CHANGELOG.html');
fs.writeFileSync('./static/README.md', linkChangelog);

// converter changelod.md pra html e copiar pra /static/doc
const changelog = fs.readFileSync('./CHANGELOG.md');
const html = converter.makeHtml(changelog.toString());
fs.writeFileSync('./static/doc/CHANGELOG.html', html);
