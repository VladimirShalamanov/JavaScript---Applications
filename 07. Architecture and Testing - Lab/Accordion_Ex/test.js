const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables

describe('E2E tests', async function () {
    this.timeout(5000);

    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('loads', async () => {
        await page.goto('http://localhost:5500');
        
        const content = await page.textContent('#main');
        expect(content).to.contain('Scalable Vector Graphics');
        expect(content).to.contain('Open standard');
        expect(content).to.contain('Unix');
        expect(content).to.contain('ALGOL');
    });

    it('working More Btn', async () =>{
        await page.goto('http//localhost:5500');

        await page.click('text=More');

        await page.waitForSelector('.extra p');

        expect(text).to.contain('Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)')
    })
});
