const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'experiences.html', 'pairing.html', 'about.html', 'wine-101.html'];
const expectedBrand = 'Arizona Wine Experience';
const retiredBrands = [
    'Curated Tucson',
    'Sonoran Wine Experiences',
    'Sonoran Wine',
    'Sonoran Desert Wine Experiences',
    'sonoran-wine-experiences',
];

function readProjectFile(filePath) {
    return fs.readFileSync(path.join(root, filePath), 'utf8');
}

function extractAttributes(html, attributeName) {
    const regex = new RegExp(`${attributeName}=["']([^"']+)["']`, 'g');
    return [...html.matchAll(regex)].map(match => match[1]);
}

function pageHasId(html, id) {
    return new RegExp(`id=["']${id}["']`).test(html);
}

test('all public pages use the current brand and shared assets', () => {
    for (const page of pages) {
        const html = readProjectFile(page);

        assert.match(html, new RegExp(expectedBrand), `${page} should include the current brand`);
        assert.match(
            html,
            /href=["']dist\/tailwind\.css["']/,
            `${page} should load compiled Tailwind CSS`
        );
        assert.match(html, /href=["']styles\.css["']/, `${page} should load shared CSS`);
        assert.doesNotMatch(
            html,
            /cdn\.tailwindcss\.com/,
            `${page} should not load the Tailwind CDN in production`
        );
        assert.match(html, /src=["']main\.js["']/, `${page} should load shared JS`);

        for (const retiredBrand of retiredBrands) {
            assert.doesNotMatch(
                html,
                new RegExp(retiredBrand),
                `${page} still references ${retiredBrand}`
            );
        }
    }
});

test('local links and local image assets resolve', () => {
    for (const page of pages) {
        const html = readProjectFile(page);
        const links = extractAttributes(html, 'href').filter(href => {
            return (
                !href.startsWith('http') &&
                !href.startsWith('mailto:') &&
                !href.startsWith('tel:') &&
                !href.startsWith('javascript:') &&
                href !== '#'
            );
        });

        for (const href of links) {
            const [targetFile, targetId] = href.split('#');
            const linkedFile = targetFile || page;

            if (!targetFile && targetId) {
                assert.ok(
                    pageHasId(html, targetId),
                    `${page} links to missing anchor #${targetId}`
                );
                continue;
            }

            assert.ok(
                fs.existsSync(path.join(root, linkedFile)),
                `${page} links to missing file ${linkedFile}`
            );

            if (targetId) {
                const linkedHtml = readProjectFile(linkedFile);
                assert.ok(
                    pageHasId(linkedHtml, targetId),
                    `${page} links to missing anchor ${linkedFile}#${targetId}`
                );
            }
        }

        const localImages = extractAttributes(html, 'src').filter(src =>
            src.startsWith('resources/')
        );
        for (const src of localImages) {
            assert.ok(
                fs.existsSync(path.join(root, src)),
                `${page} references missing image ${src}`
            );
        }
    }
});

test('interactive hooks are wired to matching markup', () => {
    const pairingHtml = readProjectFile('pairing.html');
    const mainJs = readProjectFile('main.js');

    assert.match(mainJs, /\[data-wine\]/, 'pairing script should bind wine selections');
    assert.match(mainJs, /\[data-pairs-with\]/, 'pairing script should bind food pairings');
    assert.match(
        pairingHtml,
        /data-wine=["']tempranillo["']/,
        'pairing page should expose wine choices'
    );
    assert.match(
        pairingHtml,
        /data-pairs-with=["']tempranillo["']/,
        'pairing page should expose matching food pairings'
    );

    const experiencesHtml = readProjectFile('experiences.html');
    assert.match(
        experiencesHtml,
        /id=["']booking-calendar["']/,
        'booking page should include calendar mount'
    );
    assert.match(
        mainJs,
        /function initBookingCalendar/,
        'booking calendar initializer should exist'
    );

    const wine101Html = readProjectFile('wine-101.html');
    assert.match(
        wine101Html,
        /data-module=["']wine-basics["']/,
        'Wine 101 page should expose modules'
    );
    assert.match(
        mainJs,
        /localStorage\.setItem\('wine101_progress'/,
        'course progress should persist'
    );
});

test('repository metadata matches the public brand', () => {
    const packageJson = JSON.parse(readProjectFile('package.json'));
    const readme = readProjectFile('README.md');

    assert.equal(packageJson.name, 'arizona-wine-experience');
    assert.match(readme, new RegExp(`# ${expectedBrand}`));
    assert.doesNotMatch(readme, /Sonoran Wine|Curated Tucson/);
});

test('vercel proxy configuration is present for server-side Yelp calls', () => {
    const vercelConfig = JSON.parse(readProjectFile('vercel.json'));
    const envExample = readProjectFile('.env.example');

    assert.equal(vercelConfig.framework, null);
    assert.equal(vercelConfig.buildCommand, 'npm run build');
    assert.equal(vercelConfig.outputDirectory, '.');
    assert.match(envExample, /YELP_API_KEY=replace-with-rotated-yelp-api-key/);
});
